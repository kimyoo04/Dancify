import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    //js에서도 정의해줘야 함 (canvas에서 이미지퀄리티 높이기 위해)
    canvas.width = 800;
    canvas.height = 800;

    /*
    //1.1 ~ 1.2
    ctx.rect(50, 50, 100, 100);
    ctx.rect(150, 150, 100, 100);
    ctx.rect(250, 250, 100, 100);
    ctx.fill();

    ctx.beginPath(); //이전 경로와 단절
    ctx.rect(350, 350, 100, 100);
    ctx.rect(450, 450, 100, 100);
    ctx.fillStyle = "red";

    setTimeout(() => {
      ctx.fill();
    }, 5000);
    */

    /*
    //1.3 : ctx.rect(50, 50, 100, 100);
    ctx.moveTo(50, 50); //브러쉬 위치 이동
    ctx.lineTo(150, 50); //선을 그으면서 이동
    ctx.lineTo(150, 150);
    ctx.lineTo(50, 150);
    ctx.lineTo(50, 50);
    ctx.fill();
    */

    /*
    //1.4 집 그리기
    ctx.fillRect(200, 200, 50, 200);
    ctx.fillRect(400, 200, 50, 200);
    //선의 너비를 먼저 바꿔주고 사각형 그려야 함
    ctx.lineWidth = 2;
    ctx.strokeRect(300, 300, 50, 100);

    ctx.fillRect(200, 200, 200, 20);

    //지붕 그리기
    ctx.moveTo(200, 200);
    ctx.lineTo(325, 100); //400-200+(50/2)
    ctx.stroke();
    ctx.lineTo(450, 200);
    ctx.fill();
    */

    /*
    //1.5
    ctx.fillRect(210-40, 200-20, 15, 100);
    ctx.fillRect(350-40, 200-20, 15, 100);
    ctx.fillRect(260-40, 200-20, 60, 100);
    //argument : x, y, radius(원 반지름), startAngle, endAngle
    ctx.arc(250, 100, 50, 0, 2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'white' ;
    ctx.arc(220+10, 80, 8, Math.PI, 2*Math.PI);
    ctx.arc(260+10, 80, 8, Math.PI, 2*Math.PI);
    ctx.fill();
    */

    //2.0 선 긋기


  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <canvas />
      </header>
    </div>
  );
}

export default App;
