import React from 'react'
import Particles from 'react-particles-js'
import particlesConfig from '../../particlesConfig'
import '../../Dashboard.css'
import Logo from '../../svg/benlogo-blue.svg'
import GithubSvg from '../../svg/github.svg'
import NpmSvg from '../../svg/npm.svg'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="dashboardContainer">
            <div className="particleContainer">
                <Particles
                    params={particlesConfig}
                    className="particles"
                />
                <div className="benLogo">
                    <img src={Logo} alt="benLogo"/>
                </div>
            </div>
            <main>
                <section>
                    <div className="container">
                        <h2>Co to Ben ?</h2>
                        <p>
                            Ben to matematyczna gra edukacyjna, która nie posiada ograniczeń wiekowych. Wystarczy tylko potrafić dodawać. 
                            Szybko dodawać... Gra powstała jako projekt na konkurs "Cyborg" w roku 2018.
                        </p>
                    </div>
                </section>
                <section className="dark">
                    <div className="container">
                        <h2>Jak grać w Ben ?</h2>
                        <p>
                            Na ekranie będą pojawiać się liczby a twoim zadaniem jest je zsumować. 
                            Brzmi łatwo ? Kolejne liczby są wyświetlane co sekundę. Dostępne sa trzy poziomy trudności: 
                            łatwy <b>{'< -9 do 9 >'}</b> normalny <b>{'< -30 do 30 >'}</b> trudny  <b>{'< -100 do 100 >'}</b>. 
                        </p>
                        <h3>Użytkownicy posiadający konto na Ben mogą:</h3>
                        <ul className="list">
                            <li>zapisywać liczbę zdobytych punktów</li>
                            <li>zapisywać swoje najlepsze wyniki w danej kategorii</li>
                            <li>zmierzyć się z innymi graczami w trybie pojedynku</li>
                            <li>kolekcjonować achivementy</li>
                            <li>posiadać swój profil na którym będą zapisane wszystkie osiągnięcia</li>
                        </ul>
                        <div style={{width: '100%', textAlign: 'center' }}>
                            <Link to="/register"><RaisedButton label="Zarejestruj się!" primary /></Link>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <h2>O Ben</h2>
                        <p>
                            Zawsze chciałem potrafić szybko liczyć w pamięci, osoba która wyćwiczy tę umiejętność będzie jak superbohater. 
                            Zresztą, zobaczcie sami jak bardzo to imponujące:
                        </p>

                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <iframe title="21movie" width="100%" height="400" src="https://www.youtube.com/embed/26vEcvI3v-Y?start=5" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>

                        <p>
                            To co zobaczyliscie, to fragment filmu "21". Główny bohater <b>Ben Campbell</b> potrafi liczyć bardzo szybko, 
                            co później wykorzystuje grając w kasynie. 
                            Jego przeciwnicy nie mają szans z matematycznym superbohaterem i to własnie jego imieniem postanowiłem nazwać tę grę. 
                            Odkąd zobaczyłem ten fragment, postanowiłem stworzyć narzędzie, które pozwoli poprawić mi moje matematyczne zdolności. 
                        </p>
                        <p>
                            Z pomocą przyszedł mi teleturniej "The Brain" w którym zadaniem młodej dziewczynki było zsumowanie szybko pojawiających się liczb.
                        </p>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <iframe title="theBrain" width="100%" height="400" src="https://www.youtube.com/embed/5-ZzU7Tc1XY?start=115" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                    </div>
                </section>
                <section className="dark">
                    <div className="container">
                        <h2>Technikalia</h2>
                        <p>
                            Serwis składa się z dwóch oddzielnych klocków, aplikacji klienckiej oraz serwera. 
                            Strona klienta została przygotowana za pomocą frameworka <b>React</b> którego jestem wielkim fanem, 
                            stanem aplikacji zarządza <b>Redux</b>. Jeżeli chodzi o API zostało ono przygotowane w <b>Node.js</b> z wykorzystaniem frameworka <b>Express.js</b>. 
                            Wykorzystana baza danych to <b>MongoDB</b>. Tryb pojedynku oparty jest na websocketach wykorzystałem w tym celu moduł <b>Socket.io</b>. 
                            Przy projekcie pracowałem również z API Google'a i Facebook'a. 
                            Jeżeli chodzi o samą grę, to rysowana jest ona na canvasie z wykorzystniem Reacta i modułu <b>react-konva</b>. 
                            Gra dostępna jest na jako moduł na npm.
                        </p>
                        <ul className="sourcesLinks">
                            <li>
                                <a href="https://github.com/remes2000/ben-app">
                                    <img src={GithubSvg} alt="GithubLogo" />
                                    <p>APP</p>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/remes2000/ben-api">
                                    <img src={GithubSvg} alt="GithubLogo"/>
                                    <p>API</p>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.npmjs.com/package/ben-canvas-game">
                                    <img src={NpmSvg} alt="NpmLogo"/>
                                    <p>GAME</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
            <footer>
                Created by <a href="https://github.com/remes2000">Michal Nieruchalski</a> ~ 2018
            </footer>
        </div>
    )
}

export default Dashboard