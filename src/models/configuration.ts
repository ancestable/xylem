interface MongoDbConfiguration {
  // Connection string for remote mongodb
  connectionString: string,
  // Will overwrite any given connectionString and create its own mongodb-like database
  // This is only for small databases; please consider using a valid mongodb for larger data sets
  useInternalTestDb: boolean;
}

export interface Configuration {
  // Should be set from process.env.NODE_ENV
  environment: string,
  // Port for the backend
  port: number,
  // If true logging will be enabled
  loggingEnabled: boolean,
  // If no mongodb configuration is given it will create its own mongodb-like database
  mongodb?: MongoDbConfiguration,
  // Used as salt to encrypt passwords
  encryptionSalt: string,
  // Secret for generating the jwt
  jwtSecret: string,
  // Time till the token is invalidated (e.g. "2 days" or "10 hours")
  tokenExpireDuration: string,
}
