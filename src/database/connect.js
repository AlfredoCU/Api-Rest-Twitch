import mongoonse from "mongoose";

try {
  await mongoonse.connect(process.env.URI_MONGO);
  console.log("SUCCESS_CONNECT_DB");
} catch (error) {
  console.log("ERROR_CONNECT_DB", error);
}
