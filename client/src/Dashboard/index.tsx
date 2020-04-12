import React, { FC } from 'react';
import Header from '../common/Header';

const Dashboard: FC<{ path: string }> = () => (
	<div>
		<Header />
		<h1>Dash</h1>
	</div>
);

export default Dashboard;