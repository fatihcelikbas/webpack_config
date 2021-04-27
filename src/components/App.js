// No need to import "react" just for JSX in React 17+
import '../styles/index.scss';

const App = () => {
	return (
		<>
			<section className="hero"></section>
			<main>
				<section className="row">
					<h1>Ramiz And Me!</h1>
					<p>Current placeholder</p>
				</section>
			</main>
			<section className="hero"></section>
		</>
	);
};

export default App;
