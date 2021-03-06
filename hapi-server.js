// Knex
//for extra commit
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "faraday.cse.taylor.edu", // PostgreSQL server
        user: "nate_flasher", // Your user name
        password: "sayuvezi", // Your password
        database: "nate_flasher", // Your database name
    },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const Account = require("./models/Account");
const Vehicle = require("./models/vehicle");
const VehicleType = require("./models/vehicleType");
const Ride = require("./models/ride");
const Location = require("./models/location");
const Driver = require("./models/driver");
const Authorization = require("./models/authorization");
const Passenger = require("./models/passenger");
const Passengers = require("./models/passengers");
const Drivers = require("./models/drivers");


// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true,
    },
});

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    // Output logging information.
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true,
        },
    });

    // Configure routes.
    server.route([
        {
            method: "POST",
            path: "/accounts",
            config: {
                description: "Sign up for an account",
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().required(),
                    }),
                },
            },
            handler: async (request, h) => {
                const existingAccount = await Account.query()
                    .where("email", request.payload.email)
                    .first();
                if (existingAccount) {
                    return {
                        ok: false,
                        msge: `Account with email '${request.payload.email}' is already in use`,
                    };
                }

                const newAccount = await Account.query().insert({
                    first_name: request.payload.firstName,
                    last_name: request.payload.lastName,
                    email: request.payload.email,
                    password: request.payload.password,

                });
                if (newAccount) {
                    return {
                        ok: true,
                        msge: `Created account '${request.payload.email}'`,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't create account with email '${request.payload.email}'`,
                    };
                }
            },
        },

        {
            method: "GET",
            path: "/accounts",
            config: {
                description: "Retrieve all accounts",
            },
            handler: (request, h) => {
                return Account.query();
            },
        },

        {
            method: "DELETE",
            path: "/accounts/{id}",
            config: {
                description: "Delete an account",
            },
            handler: (request, h) => {
                return Account.query()
                    .deleteById(request.params.id)
                    .then((rowsDeleted) => {
                        if (rowsDeleted === 1) {
                            return {
                                ok: true,
                                msge: `Deleted account with ID '${request.params.id}'`,
                            };
                        } else {
                            return {
                                ok: false,
                                msge: `Couldn't delete account with ID '${request.params.id}'`,
                            };
                        }
                    });
            },
        },

        {
            method: "POST",
            path: "/login",
            config: {
                description: "Log in",
                validate: {
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                        password: Joi.string().min(8).required(),
                    }),
                },
            },
            handler: async (request, h) => {
                const account = await Account.query()
                    .where("email", request.payload.email)
                    .first();
                if (
                    account &&
                    (await account.verifyPassword(request.payload.password))
                ) {
                    return {
                        ok: true,
                        msge: `Logged in successfully as '${request.payload.email}'`,
                        details: {
                            id: account.id,
                            firstName: account.first_name,
                            lastName: account.last_name,
                            email: account.email,
                        },
                    };
                } else {
                    return {
                        ok: false,
                        msge: "Invalid email or password",
                    };
                }
            },
        },
        //ADD VEHICLE ON ADMIN PAGE
        {
            method: "POST",
            path: "/vehicle",
            config: {
                description: "Add vehicle",
                validate: {
                    payload: Joi.object({
                        make: Joi.string().required(),
                        model: Joi.string().required(),
                        color: Joi.string().required(),
                        capacity: Joi.number().required(),
                        mpg: Joi.number().required(),
                        licenseState: Joi.string().required(),
                        licenseNumber: Joi.string().required(),
                        vehicleTypeId: Joi.number().required(),
                    }),
                },
            },
            handler: async (request, h) => {
                const addVehicle = await Vehicle.query().insert({
                    make: request.payload.make,
                    model: request.payload.model,
                    color: request.payload.color,
                    capacity: request.payload.capacity,
                    mpg: request.payload.mpg,
                    licenseState: request.payload.licenseState,
                    licenseNumber: request.payload.licenseNumber,
                    vehicleTypeId: request.payload.vehicleTypeId,
                });

                if (addVehicle) {
                    return {
                        ok: true,
                        msge: `Created vehicle '${request.payload.licenseNumber}'`,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't create vehicle '${request.payload.licenseNumber}'`,
                    };
                }

            },

        },
        //GET VEHICLE TYPEID
        {
            method: "GET",
            path: "/vehicleType",
            config: {
                description: "grabs vehicleTypes",
            },
            handler: (request, h) => {
                return VehicleType.query();
            },
        },
        //GET VEHICLE ID
        {
            method: "GET",
            path: "/vehicleId",
            config: {
                description: "grabs vehicle ids",
            },
            handler: (request, h) => {
                return Vehicle.query()
                    .select('id');
            },
        },

        //UPDATE VEHICLE ROUTE
        {
            method: "PATCH",
            path: "/vehicle",
            config: {
                description: "Update vehicle",
                validate: {
                    payload: Joi.object({
                        id: Joi.number().required(),
                        make: Joi.string().required(),
                        model: Joi.string().required(),
                        color: Joi.string().required(),
                        capacity: Joi.number().required(),
                        mpg: Joi.number().required(),
                        licenseState: Joi.string().required(),
                        licenseNumber: Joi.string().required(),
                        vehicleTypeId: Joi.number().required(),
                    }),
                },
            },
            handler: async (request, h) => {

                const updatedVehicle = await Vehicle.query()
                    .where("id", request.payload.id)
                    .first();

                const updateVehicleQuery = await Vehicle.query()
                    .findById(updatedVehicle.id)
                    .patch({
                        make: request.payload.make,
                        model: request.payload.model,
                        color: request.payload.color,
                        capacity: request.payload.capacity,
                        mpg: request.payload.mpg,
                        licenseState: request.payload.licenseState,
                        licenseNumber: request.payload.licenseNumber,
                        vehicleTypeId: request.payload.vehicleTypeId,
                    });

                if (updateVehicleQuery) {
                    return {
                        ok: true,
                        msge: `Updated vehicle with license plate number of: '${request.payload.licenseNumber}'`,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Failed to update vehicle with license plate number: '${request.payload.licenseNumber}'`,
                    };
                }

            },

        },

        // Posts/adds to vehicletype!
        {
            method: "POST",
            path: "/vehicleType",
            config: {
                description: "adds vehicle type",
                validate: {
                    payload: Joi.object({
                        type: Joi.string().required(),
                    }),
                },
            },
            handler: async (request, h) => {

                const addVehicleTypeQuery = await VehicleType.query().insert({
                    type: request.payload.type,
                });

                if (addVehicleTypeQuery) {
                    return {
                        ok: true,
                        msge: `Created vehicle type: '${request.payload.type}'`,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Failed to create vehicle type: '${request.payload.type}'`,
                    };
                }

            },

        },

//CREATES A RIDE
        {
            method: "POST",
            path: "/ride",
            config: {
                description: "Add ride",
                validate: {
                    payload: Joi.object({
                        date: Joi.date().required(),
                        time: Joi.string().required(),
                        distance: Joi.number().required(),
                        fuelPrice: Joi.number().required(),
                        fee: Joi.number().required(),
                        vehicleId: Joi.number().required(),
                        fromLocationId: Joi.number().required(),
                        toLocationId: Joi.number().required(),
                    }),
                },
            },
            handler: async (request, h) => {
                const addRide = await Ride.query().insert({
                    date: request.payload.date,
                    time: request.payload.time,
                    distance: request.payload.distance,
                    fuelPrice: request.payload.fuelPrice,
                    fee: request.payload.fee,
                    vehicleId: request.payload.vehicleId,
                    fromLocationId: request.payload.fromLocationId,
                    toLocationId: request.payload.toLocationId,
                });

                if (addRide) {
                    return {
                        ok: true,
                        msge: `Created ride `,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't create ride `,
                    };
                }

            },

        },

// GETS LOCATION IDS
        {
            method: "GET",
            path: "/location",
            config: {
                description: "Grabs location id's",
            },
            handler: (request, h) => {
                return Location.query()
                    .select('id')
                    .select('address');

            },
        },
//GETS RIDE IDS
        {
            method: "GET",
            path: "/rideId",
            config: {
                description: "Grabs ride id's",
            },
            handler: (request, h) => {
                return Ride.query()
                    .select('id');

            },
        },

// for commit
        //UPDATES A RIDE
        {
            method: "PATCH",
            path: "/ride",
            config: {
                description: "Update ride",
                validate: {
                    payload: Joi.object({
                        id: Joi.number().required(),
                        date: Joi.date().required(),
                        time: Joi.string().required(),
                        distance: Joi.number().required(),
                        fuelPrice: Joi.number().required(),
                        fee: Joi.number().required(),
                        vehicleId: Joi.number().required(),
                        fromLocationId: Joi.number().required(),
                        toLocationId: Joi.number().required(),
                    }),
                },
            },
            handler: async (request, h) => {

                const updatedRide = await Ride.query()
                    .where("id", request.payload.id)
                    .first();

                const updateRide = await Ride.query()
                    .findById(updatedRide.id)
                    .patch({
                        id: request.payload.id,
                        date: request.payload.date,
                        time: request.payload.time,
                        distance: request.payload.distance,
                        fuelPrice: request.payload.fuelPrice,
                        fee: request.payload.fee,
                        vehicleId: request.payload.vehicleId,
                        fromLocationId: request.payload.fromLocationId,
                        toLocationId: request.payload.toLocationId,
                    });

                if (updateRide) {
                    return {
                        ok: true,
                        msge: `Updated ride with id: '${request.payload.id}'`,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't update ride with id of: '${request.payload.id}' `,
                    };
                }

            },

        },
        //get vehicles

        {
            method: "GET",
            path: "/vehicle",
            config: {
                description: "Grabs vehicle id's and license numbers",
            },
            handler: (request, h) => {
                return Vehicle.query()
                    .select('id')
                    .select('licenseNumber');

            },
        },

        //Get driver
        {
            method: "GET",
            path: "/driver",
            config: {
                description: "Grabs driver id's",
            },
            handler: (request, h) => {
                return Driver.query()
                    .select('id')
                    .select('firstName');

            },
        },

        //posts authorization
        {
            method: "POST",
            path: "/authorization",
            config: {
                description: "Authorize a driver for a vehicle",
                validate: {
                    payload: Joi.object({
                        driverId: Joi.number().integer().min(1).required(),
                        vehicleId: Joi.number().integer().min(1).required(),
                    }),
                },
            },
            handler: async (request, h) => {
                // Find the driver.
                const driver = await Driver.query().findById(request.payload.driverId);
                if (!driver) {
                    return {
                        ok: false,
                        msge: `No driver with ID ${request.payload.driverId}`,
                    };
                }
                // Find the vehicle.
                const vehicle = await Vehicle.query().findById(
                    request.payload.vehicleId
                );
                if (!vehicle) {
                    return {
                        ok: false,
                        msge: `No vehicle with ID ${request.payload.vehicleId}`,
                    };
                }
                // Make sure the driver is not already authorized for the vehicle.
                const existingAuth = await driver
                    .$relatedQuery("vehicle")
                    .where("id", vehicle.id)
                    .first();
                if (existingAuth) {
                    return {
                        ok: false,
                        msge: "Driver already authorized for that vehicle",
                    };
                }
                // Authorize the driver for the vehicle.
                const affected = await driver.$relatedQuery("vehicle").relate(vehicle);
                if (affected === 1) {
                    return {
                        ok: true,
                        msge: "Driver successfully authorized for vehicle",
                    };
                } else {
                    return {
                        ok: false,
                        msge: "Couldn't authorize driver for vehicle",
                    };
                }
            },
        },

        {
            method: "POST",
            path: "/passengers",
            config: {
                description: "Assigns passenger to ride",
                validate: {
                    payload: Joi.object({
                        passengerId: Joi.number().integer().min(1).required(),
                        rideId: Joi.number().integer().min(1).required(),
                    }),
                },
            },
            handler: async (request, h) => {
                // Find the driver.
                const passenger = await Passenger.query().findById(request.payload.passengerId);
                if (!passenger) {
                    return {
                        ok: false,
                        msge: `No passenger with ID ${request.payload.passengerId}`,
                    };
                }
                // Find the vehicle.
                const ride = await Ride.query().findById(
                    request.payload.rideId
                );
                if (!ride) {
                    return {
                        ok: false,
                        msge: `No ride with ID ${request.payload.rideId}`,
                    };
                }
                // Make sure the driver is not already authorized for the vehicle.
                const existingPass = await passenger
                    .$relatedQuery("ride")
                    .where("id", ride.id)
                    .first();
                if (existingPass) {
                    return {
                        ok: false,
                        msge: "Passenger already in ride",
                    };
                }
                // Authorize the driver for the vehicle.
                const affected = await passenger.$relatedQuery("ride").relate(ride);
                if (affected === 1) {
                    return {
                        ok: true,
                        msge: "Passenger registered for ride",
                    };
                } else {
                    return {
                        ok: false,
                        msge: "Couldn't register passenger for ride",
                    };
                }
            },
        },
//GET RIDE REPORT
        {
            method: "GET",
            path: "/report",
            config: {
                description: "Get report of rides",
            },
            handler: async (request, h) => {

                return Ride.query()
                    .withGraphFetched('passenger')
                    .withGraphFetched('driver')


            },

        },

        //GET ALL PASSENGERS
        {
            method: "GET",
            path: "/passenger",
            config: {
                description: "Get all passengers",
            },
            handler: async (request, h) => {
                return Passenger.query()


            },

        },


        //GET RIDES FOR ONE PASSENGER NOOOOOT DONEEE
        {
            method: "GET",
            path: "/rides",
            config: {
                description: "Get rides for one passenger",
            },
            handler: async (request, h) => {
                return Ride.query()


            },

        },


        //GET ALL DRIVERS
        {
            method: "GET",
            path: "/driverAll",
            config: {
                description: "Get all drivers",
            },
            handler: async (request, h) => {
                return Driver.query()


            },

        },

        {
            method: "POST",
            path: "/passenger",
            config: {
                description: "Add passenger",
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        phone: Joi.number().required(),
                    }),
                },
            },
            handler: async (request, h) => {
                const addPassenger = await Passenger.query().insert({
                    firstName: request.payload.firstName,
                    lastName: request.payload.lastName,
                    phone: request.payload.phone
                });

                if (addPassenger) {
                    return {
                        ok: true,
                        msge: `Added Passenger `,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't add Passenger `,
                    };
                }

            },

        },

        //POST TO DRIVERS
        {
            method: "POST",
            path: "/drivers",
            config: {
                description: "Register drive to ride",
                validate: {
                    payload: Joi.object({
                        driverId: Joi.number().integer().min(1).required(),
                        rideId: Joi.number().integer().min(1).required(),
                    }),
                },
            },
            handler: async (request, h) => {
                // Find the driver.
                const driver = await Driver.query().findById(request.payload.driverId);
                if (!driver) {
                    return {
                        ok: false,
                        msge: `No driver with ID ${request.payload.driverId}`,
                    };
                }
                // Find the vehicle.
                const ride = await Ride.query().findById(
                    request.payload.rideId
                );
                if (!ride) {
                    return {
                        ok: false,
                        msge: `No ride with ID ${request.payload.rideId}`,
                    };
                }
                // Make sure the driver is not already authorized for the vehicle.
                const existingDriv = await driver
                    .$relatedQuery("ride")
                    .where("id", ride.id)
                    .first();
                if (existingDriv) {
                    return {
                        ok: false,
                        msge: "Driver already driving that ride",
                    };
                }
                // Authorize the driver for the vehicle.
                const affected = await driver.$relatedQuery("ride").relate(ride);
                if (affected === 1) {
                    return {
                        ok: true,
                        msge: "Driver successfully registered to drive that ride",
                    };
                } else {
                    return {
                        ok: false,
                        msge: "Failed to register drive for that ride",
                    };
                }
            },
        },

        {
            method: "POST",
            path: "/driver",
            config: {
                description: "Add driver",
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        phone: Joi.number().required(),
                        licenseNumber: Joi.string().required()
                    }),
                },
            },
            handler: async (request, h) => {
                const addDriver = await Driver.query().insert({
                    firstName: request.payload.firstName,
                    lastName: request.payload.lastName,
                    phone: request.payload.phone,
                    licenseNumber: request.payload.licenseNumber,

                });

                if (addDriver) {
                    return {
                        ok: true,
                        msge: `Added Driver `,
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't add Driver `,
                    };
                }

            },

        },

    ]);

    // Start the server.
    await server.start();
}

process.on("unhandledRejection", (err) => {
    server.logger().error(err);
    process.exit(1);
});

// Go!
init();
