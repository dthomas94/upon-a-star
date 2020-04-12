import React, { FC } from "react";
import Header from "../common/Header";

const Home: FC<{ path: string }> = () => (
	<div>
		<Header />
		<h1>Home</h1>
	</div>
);

export default Home;
