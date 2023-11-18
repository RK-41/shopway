/*
  18.11.

  Meta Component

   For Helmet Provider: To provide webpage title, description and the associated kywords.
*/

import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to ShopWay',
	description: 'Get premium products at best price',
	keywords:
		'electronics, buy electronics, gaming, pc, pc accessories, accessories',
};

export default Meta;
