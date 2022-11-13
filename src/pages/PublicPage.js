import { Link } from 'react-router-dom';

const PublicPage = () => {
	return (
		<section className='public'>
			<header>
				<h1>
					Welcome to <span className='nowrap'>Angel Tech!</span>
				</h1>
			</header>
			<main className='public__main'>
				<p>
					Located in Beautiful Foo City, Angel Tech provides a whole team of
					trained staff ready to help out with your tech issues.
				</p>
				<address className='public__addr'>
					Angel Tech
					<br />
					123 Foo Street
					<br />
					Foo City, SW1A 0AA
					<br />
					<a href='tel:+4412345678910'>01234 5678910</a>
				</address>
				<br />
				<p>
					Sign up for our service <a href='mailto:email@email.com'>here</a>!
				</p>
			</main>
			<footer>
				<Link to='/login'>Portal Login</Link>
			</footer>
		</section>
	);
};
export default PublicPage;
