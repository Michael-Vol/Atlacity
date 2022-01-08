import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MapGL, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';

import { MdLocationPin } from 'react-icons/md';

const MAPBOX_TOKEN =
	'pk.eyJ1IjoibWljaGFlbHZvbCIsImEiOiJja2RhcTJ0bmgxMjA0MnlrNmI1YWZqbmJoIn0.m6J1J-HNN5o4VhQ5ix26Yg';

const LocationSelector = ({ onSelect, cityCoords }) => {
	const [viewport, setViewport] = useState({
		latitude: cityCoords.lat,
		longitude: cityCoords.lng,
		zoom: 12,
		bearing: 0,
		pitch: 0,
	});

	useEffect(() => {
		setViewport({
			...viewport,
			latitude: cityCoords.lat,
			longitude: cityCoords.lng,
		});
	}, [cityCoords]);

	const navControlStyle = {
		right: 40,
		top: 10,
	};
	const geolocateControlStyle = {
		right: 40,
		top: 105,
	};

	const [selectedCoord, setSelectedCoord] = useState();
	return (
		<MapGL
			{...viewport}
			width='100%'
			height='400px'
			mapStyle='mapbox://styles/mapbox/streets-v11'
			onViewportChange={setViewport}
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onClick={(map) => {
				setSelectedCoord(map.lngLat);
				onSelect({
					coords: map.lngLat,
				});
			}}>
			<NavigationControl style={navControlStyle} />
			<GeolocateControl
				style={geolocateControlStyle}
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation={true}
				auto
			/>
			{selectedCoord && (
				<Marker
					latitude={selectedCoord[1]}
					longitude={selectedCoord[0]}
					offsetLeft={-27}
					offsetTop={-30}>
					<MdLocationPin size={'32px'} />
				</Marker>
			)}
		</MapGL>
	);
};

export default LocationSelector;
