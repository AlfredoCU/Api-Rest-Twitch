import mongoonse from "mongoose";

try {
  await mongoonse.connect(process.env.URI_MONGO);
  console.info("Connect DB");
} catch (error) {
  console.error("ERROR_CONNECT", error);
}
