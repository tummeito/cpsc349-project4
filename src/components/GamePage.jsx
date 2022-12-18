import { useState} from 'react';
import PocketBase from 'pocketbase';
import "../style/main.css"


export default function GamePage({pScore, oScore}) {

    const pb = new PocketBase('https://pocketbase.io');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function authenticate(userEmail, userPassword) {
        const USERNAME = userEmail;
        const PASSWORD = userPassword;
        const pb = new PocketBase("http://pocketbase.io");
        const authData = await pb.collection('users').authWithPassword(USERNAME, PASSWORD);

        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.model.id);

        pb.authStore.clear();
    }

    function validation() {
        return (
            <div className="flex justify-center items-center p-10">
                <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form>
                        <div class="mb-6">
                            <input
                                type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                                onChange={event => setEmail(event.target.value)}/>
                        </div>
                        <div class="mb-6">
                            <input
                                type="password"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password"
                                onChange={event => setPassword(event.target.value)}/>
                        </div>
                        <button
                            type="submit"
                            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={authenticate(email, password)}
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const moveKey = { 
        rock: "scissors", 
        scissors: "paper", 
        paper: "rock"
    }

    const images = {
        scissors: "https://cdn.pixabay.com/photo/2016/03/31/23/11/scissors-1297454__340.png", 
        paper: "https://cdn.pixabay.com/photo/2014/12/21/23/56/papers-576385_1280.png", 
        rock: "https://i.pinimg.com/originals/4d/40/db/4d40dbef4879e329e9e9309ca3320470.png"
    }

    const [pImg, setPImg] = useState(images.rock);
    const [oImg, setOImg] = useState(images.rock);
    const [playerScore, setPlayerScore] = useState(pScore);
    const [enemyScore, setEnemyScore] = useState(oScore);


    function RandomizeEnemyMove() {
        let choices = Object.keys(moveKey);

        return choices[Math.floor(Math.random() * choices.length)];
    }

    function Logic(playerMove) {
        // Generating the enemy's move and updating the picture to display its correct move
        const enemyMove = RandomizeEnemyMove();
        console.log("Opponent's Move: ", enemyMove);
        console.log("Player's Move: ", playerMove);
        setPImg(images[playerMove]);
        setOImg(images[enemyMove]);
        
        if(moveKey[playerMove] === enemyMove) {
            console.log("player won!");
            setEnemyScore((previousScore) => previousScore+1);
        } else if(moveKey[enemyMove] === playerMove) {
            console.log("opponent won!");
            setPlayerScore((previousScore) => previousScore+1);
        } else {
            console.log("tie!");
        }
    }

    function restart() {
        setPlayerScore(0);
        setEnemyScore(0);
    }

    return ( 
        <main>
            <div>{validation()}</div>
            <div className="flex justify-center items-center p-10">
                <div className="pb-10 flex justify-center items-center flex-col">
                    <h1 className="p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10"> You: {playerScore} </h1>
                    <img className='w-20 h-20' src={pImg} alt="the current move the player played" />
                </div>
                <div className="pb-10 flex justify-center items-center flex-col">
                    <h1 className="p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10" > Opponent: {enemyScore} </h1>
                    <img className='w-20 h-20' src={oImg} alt="the current move the opponent played" />
                </div>
            </div>
            <div>
                <button onClick={()=>{Logic("rock")}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">🗿</button>
                <button onClick={()=>{Logic("paper")}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">📃</button>
                <button onClick={()=>{Logic("scissors")}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">🔪</button>
            </div>
            <button onClick={()=>{restart()}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">RESTART</button>
        </main>

    );
}
