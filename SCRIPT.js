const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]
    let current_player = 1
    let gameOver = false
    let count=-1
    const render = () => {
        // console.log(1)
        let inHTML = "";
        gameboard.forEach((value, index) => {
            inHTML += `<div class="squares" id="square_no-${index}">${value}</div>`
        })

        let main_tic__space = document.getElementById("main_tic__space");
        main_tic__space.innerHTML = inHTML;
        checkWin()
        addevent()
    }
    const addevent = () => {
        let squares = Array.from(document.querySelectorAll(".squares"));
        squares.forEach((index) => {
            index.addEventListener("click", handleclick);
        })
    }
    const handleclick = (e) => {
        if(gameOver){
            return;
        }
        if (current_player === 1) {

            let ind = e.target.id.split("-")[1];
            if (gameboard[ind] !== "") {

                return
            }
            gameboard[ind] = "X";

        } else if (current_player === 2) {
            let ind = e.target.id.split("-")[1];
            if (gameboard[ind] !== "") {
                return
            }
            gameboard[ind] = "O";

        }
        render();
        current_player = current_player===1?2:1;



    }

    const checkWin = () =>{
        count+=1;
        const winningCombinations = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[2,5,8],[0,4,8],[2,4,6]
        ]
        for(let i=0;i<winningCombinations.length;i++){
            const [a,b,c] = winningCombinations[i];
            if(gameboard[a] && gameboard[a]===gameboard[b]&&gameboard[b]===gameboard[c]){
                gameOver=true;
                // alert("game ober");
                handleclick();
                PostGame.display(current_player)
            }
        }
        if(count===9){
            PostGame.Draw()
        }

    }

    return {
        render, addevent,
    }
})()


const PostGame=(()=>{
    const main_winner = document.getElementById("main__winner");
    const restart = document.getElementById("restart");
    const main_winner_text = document.getElementById("winner_text");
        const display = (current_player) => {
            main_winner_text.innerText=`Congratulations ${users[current_player-1]}, you won!`;
            main_winner.classList.remove("hide");

    }
    const Draw=()=>{
        main_winner_text.innerText=`It's a Draw`;
        main_winner.classList.remove("hide");
    }
    restart.addEventListener("click",()=>{
        location.reload()
    });

 return {
        display,Draw
 }
    }
)()

let users=["",""];
const Pregame = (e) => {
    e.preventDefault();

    let input1 = document.getElementById("form_player__one");
    let input2 = document.getElementById("form_player__two");

    if (input1.value === "" || input2.value === "") {
        return
    }
    let pName1 = document.querySelector(".main__player__name.one");
    let pName2 = document.querySelector(".main__player__name.two");

    pName1.innerText = input1.value;
    pName2.innerText = input2.value;
    users[0]= input1.value;
    users[1]= input1.value;

    let user1 = document.querySelector(".user.one");
    let user2 = document.querySelector(".user.two");

    user1.classList.remove("hide");
    user2.classList.remove("hide");

    let formss = document.querySelector("#main__forms");
    formss.style.display = "none";


    Gameboard.render();

}


const submit = document.querySelector("input[type=submit]")
submit.addEventListener("click", Pregame)