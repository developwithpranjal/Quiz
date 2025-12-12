const quiz = document.querySelector(".quiz");
const ques = document.querySelector(".ques");
const timer = document.querySelector(".timer");
const choices = document.querySelectorAll(".choices p");
const button = document.querySelector(".next");
const box = document.querySelector(".box");
const imageContainer = document.querySelector(".image-container");


const arr = [
  {
    question: " Q1).Who Stole the most number of Votes during Elections?",
    ans: "आदरणीय मोदीजी",
    options: ["Rahul Gandhi", "आदरणीय मोदीजी", "Nitish Kumar", "Vin Deisel"],
     ContainsImage :false
  },
  {
    question: "Q2).Who is the owner of FUll STACK LEARNING?",
    ans: "Mr.Rohit Jain",
    options: [
      "Jawaharlal Nehru",
      "Pranjal ",
      "Mr.Rohit Jain",
      "Dr. Rajendra Prasad",
      
    ],
        ContainsImage :false
  },
  {
    question: "Q3).Who was the Lead Actor in Top Gun - Maverick",
    ans: "Tom Cruise",
    options: ["Dharam paaji", "ModiJi", "Tom Cruise", "Kartik Aryan"],
         ContainsImage :false
  },
  {
    question: "Q4).Highest grossing Bollywood Movie?",
    ans: "Pathan",
    options: ["Ra.One", "Pathan", "Avatar", "Dhurandhar"],
    ContainsImage :false
  },
  {
    question: "Q5).Name of this Person?",
    images: ["https://www.dailysia.com/wp-content/uploads/2022/12/Dhruv-Rathee_2.jpg?x62393"],
    
    ans: "Dhruv Rathee",
    options: ["Pushkrine", "Dhruv Rathee", "Me", "Pranjal"],
    ContainsImage :true,
        
  },
];

let QuesNum = 0;
let score = 0;
let intervals;
let getrandom = [];


ShowQuestion();
timers();

function RandomQuestions() {
  let RandomValue = Math.floor(Math.random() * arr.length);
  if (getrandom.includes(RandomValue)) {
    return RandomQuestions();
  } else {
    getrandom.push(RandomValue);
    QuesNum = RandomValue;
    // console.log(QuesNum);
    
  }
}

function ShowQuestion() {
  RandomQuestions();
  let saveques = arr[QuesNum];
  ques.textContent = saveques.question;
   imageContainer.innerHTML = "";
   
   if (saveques.ContainsImage === true) {
    saveques.images.forEach((imgURL) => {
      let img = document.createElement("img");
      img.src = imgURL;
      img.style.width = "150px";
      img.style.borderRadius = "10px";
      imageContainer.append(img);
    });
  }

  choices.forEach((para, i) => {
    para.textContent = saveques.options[i];
  });
}

function timers() {
  clearInterval(intervals);

  let count = 5;
  timer.textContent = count;

  intervals = setInterval(() => {
    count--;
    timer.textContent = count;
    if (count === 0) {
      clearInterval(intervals);

      if (getrandom.length === arr.length) {
        quiz.style.display = "none";
        DisplayScore();
        return;
      }

      ResetAll();
      ShowQuestion();
      timers();
    }
  }, 1000);
}

choices.forEach((option) => {
  option.addEventListener("click", () => {
    choices.forEach((opt)=>{
        opt.style.pointerEvents = "none";
    })
   
    
    if (option.innerHTML === arr[QuesNum].ans) {
      option.style.backgroundColor = "#7fff00";
      score++;
    } else {
      option.style.backgroundColor = "red";
      choices.forEach((opt) => {
        if (opt.innerHTML === arr[QuesNum].ans) {
          opt.style.backgroundColor = "#7fff00";
        } else {
          opt.style.color = "";
        }
      });
    }
  });
});
function ResetAll() {
  choices.forEach((opt) => {

    opt.style.backgroundColor = "#f1f2f6";
    opt.style.pointerEvents = "auto";
   

  });
}

function DisplayScore() {
    document.querySelector("h2").style.display = "none";

  let para = document.createElement("p");
  para.classList.add("score");
  
  para.innerText = ` Your Score Is ${score} Out Of ${arr.length}`;
  box.append(para);
}

button.addEventListener("click", () => {
  if (getrandom.length === arr.length)return;

  ResetAll();
  ShowQuestion();
  timers();
});
