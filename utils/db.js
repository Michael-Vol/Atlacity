import mongoose from 'mongoose';
import getEnv from '../config/env';

const connectToDB = async () => {
	const dbUser = getEnv('MONGODB_ATLAS_USER');
	const dbPassword = getEnv('MONGODB_ATLAS_PASSWORD');
	const dbCluster = getEnv('MONGODB_ATLAS_CLUSTERNAME');
	const dbName = getEnv('MONGODB_ATLAS_DBNAME');

	//maintain a cached connection across hot reloads
	let cached = global.mongoose;

	if (!cached) {
		cached = global.mongoose = { conn: null, promise: null };
	}

	if (cached.conn) {
		//connection is already cached
		return cached.conn;
	}

	if (!cached.promise) {
		//create mongoose connect promise
		cached.promise = mongoose.connect(
			`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.izp1p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
	}
	cached.conn = await cached.promise; //await for mongoose client
	return cached.con;
};

export default connectToDB;
