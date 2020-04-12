import React, { FC } from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import Dashboard from "./Dashboard";
import { useQuery, gql } from "@apollo/client";

const ME = gql`
	query me {
		me {
			id
		}
	}
`;

const App: FC = () => {
  const { data, loading, error } = useQuery(ME);
  
  if (!data) return <p>...No data</p>;
  if (loading) return <p>...loading</p>;
  if (error) return <p>...Error</p>;

	return (
		<ThemeProvider theme={theme}>
			<div id="junk" style={{ padding: 50 }}>
				<Router>
					<Home path="/" />
					<Dashboard path="dashboard" />
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;
