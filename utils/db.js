import mongoose from 'mongoose';
import getEnv from '../config/env';

const connectToDB = async () => {
	const dbUser = getEnv('MONGODB_ATLAS_USER');
	const dbPassword = getEnv('MONGODB_ATLAS_PASSWORD');
	const dbCluster = getEnv('MONGODB_ATLAS_CLUSTERNAME');
	const dbName = getEnv('MONGODB_ATLAS_DBNAME');

	console.log(dbPassword, dbUser);

	const client = await mongoose.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.izp1p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);

	return client;
};

export default connectToDB;
