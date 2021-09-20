import React from 'react';

import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='descripton' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to Luxury Store',
	description: 'Well sell luxury super fast cars',
	keywords: 'cars, buy fast cars, super fast, lamboghini, ferrari',
};

export default Meta;