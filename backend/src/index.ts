import { createConnection } from "typeorm";
import app from "./app";

const setupServerAndDB = async () => {
  console.log("CONNECTING TO DB");
  // connect with db
  const dbConnection = await createConnection().catch((err) => {
    throw Error(err);
  });

  console.log("CONNECTED TO DB");

  // start express server
  return new Promise((resolve, reject) => {
    const server = app
      .listen(process.env.PORT, () => {
        console.log("EXPRESS READY");
        resolve(true);
        console.log("server started");

        process.on("SIGINT", () => {
          console.log("SIGINT RECEIVED STARTING SHUTDOWN");
          server.close(async () => {
            console.log("SERVER SHUTDOWN");
            console.log("SHUTTING DOWN DB");
            await dbConnection.close();
            console.log("DB CLOSED");
            process.exit(0);
          });
        });
      })
      .on("error", (err) => {
        throw Error(err.message);
      });
  });
};

console.log("SERVER STARTING");
setupServerAndDB()
  .then(() => {
    console.log(
      `SERVICES UP AND RUNNING ON PORT ${process.env.PORT} WITH UPDATES`
    );
    process.send ? process.send("ready") : function () {};
  })
  .catch((e) => {
    console.log(e);
  });
