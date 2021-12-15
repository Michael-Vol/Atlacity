import getEnv from '../../../config/env';
import axios from 'axios';

export default async (req, res) => {
	switch (req.method) {
		case 'GET': {
			try {
				const { place } = req.query;
				const limit = req.query.limit ?? '3';
				const apiKey = getEnv('GEOAPIFY_API_KEY');
				const places = await axios.get(
					`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&limit=${limit}&apiKey=${apiKey}`
				);

				return res.json({
					places: places.data.features,
				});
			} catch (error) {
				return res.status(500).json({
					error,
				});
			}
		}
		default: {
			return res.status(405).json({ message: 'Invalid HTTP Method' });
		}
	}
};
