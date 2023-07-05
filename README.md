# 🕺 Dancify

### 춤을 배우고 싶은 케이팝(K-POP) 팬들을 위한 안무연습도움 서비스

![포스터_최종](https://github.com/AIVLE-School-Third-Big-Project/dancify/assets/124374862/05f88211-d989-4a66-a56f-0cbf9188d598)

<br>

## 목차
1. [프로젝트 소개](#1-프로젝트-소개)
2. [서비스 주요 기능](#2-서비스-주요-기능)
3. [프로젝트 아키텍처](#3-프로젝트-아키텍처)
4. [기술 스택](#4-기술-스택)
5. [데이터셋](#5-데이터셋)
6. [프로젝트 팀원 소개](#6-프로젝트-팀원-소개)
7. [실행 방법](#7-실행-방법)

## **1. 프로젝트 소개**

### **1.1 주제 선정 배경 및 프로젝트 개요**

블랙핑크, BTS와 같은 월드 스타들의 등장에 따라 세계적으로 K-POP에 대한 인기와 관심이 더욱 높아지고 있습니다.

이로 인해 시장 규모는 꾸준히 확대되고 있으며, 방송 댄스 강좌에 대한 수요가 더욱 증가하고 있습니다.

그러나 춤을 배우는 것에는 여전히 수강료에 대한 부담과 정해진 시간 및 공간에서 레슨을 받아야 한다는 제약이 있습니다.

저희는 경제적 부담과 시공간적 제약을 극복하고 더 많은 사람들이 춤을 배우고 즐길 수 있는 기회를 제공하고자 합니다.

이를 통해, K-POP 댄스에 대한 열정을 가진 사람들이 보다 쉽고 효율적으로 교육을 받을 수 있을 것으로 기대하고 있습니다.

<br>

### **1.2 서비스 목표**

춤을 배우고 싶은 사람들을 위해 AI와 전문가 피드백을 중심으로 저비용의 교육적인 서비스를 제공합니다.

<br>

## **2. 서비스 주요 기능**

### **2.1 메인 페이지 (댄서 게시판)**

- 따라 추고 싶은 댄서의 영상으로 접속하여 직접 춤을 추고 피드백 받을 수 있습니다.
- 연습모드와 실전모드가 있어 점진적 학습이 가능합니다.
  - 연습모드: 구간별 연습이 가능합니다.
  - 실전모드: 전구간을 한 번에 진행합니다.
- AI를 통해 실시간 점수와 구간별 점수를 제공받을 수 있습니다.
- 음성 조작을 통해 보다 편리한 사용자 경험을 제공합니다.

![댄서 게시판 1](https://github.com/Yujun-Won/temp/assets/124374862/25da79e9-ef63-4675-a087-b3219df0e688)
![댄서 게시판 2](https://github.com/Yujun-Won/temp/assets/124374862/415c4483-b721-4059-8b24-9737153e9643)
![댄서 게시판 3](https://github.com/Yujun-Won/temp/assets/124374862/bc8d622c-4a59-4c8d-b4e4-eabdda559c46)
![댄서 게시판 4](https://github.com/Yujun-Won/temp/assets/124374862/5552c922-f950-4960-964a-624f980b756c)

### **2.2 자랑 게시판**

- 자랑 게시판을 통해 자신이 춘 춤 영상을 공유할 수 있습니다.

![자랑 게시판 1](https://github.com/Yujun-Won/temp/assets/124374862/185c33ee-ffd1-4207-bef2-e3aa2c2f0755)
![자랑 게시판 2](https://github.com/Yujun-Won/temp/assets/124374862/19c50c3d-a0d5-4814-8a50-f814e874401a)

### **2.3 자유 게시판**

- 자유 게시판을 통해 사람들과 소통할 수 있습니다.

![자유 게시판 1](https://github.com/Yujun-Won/temp/assets/124374862/e3ab3520-9158-42e6-9c14-3b7493348488)
![자유 게시판 2](https://github.com/Yujun-Won/temp/assets/124374862/8faa7678-e44c-4ce3-b727-485ab7b23be8)

### **2.4 피드백 동영상**

- 자신이 춘 춤 영상을 관리하고 댄서에게 피드백을 요청할 수 있습니다.
- 신체 부위별 AI 피드백을 받을 수 있습니다.

![피드백 게시판](https://github.com/Yujun-Won/temp/assets/124374862/7a0bedb9-8128-4119-ac47-6fd4066b24c3)

<br>

## **3. 프로젝트 아키텍처**

### Infrastructure
![image](https://github.com/Yujun-Won/temp/assets/124374862/9197c142-218e-410b-b141-463b2536ebe4)


### ERD
![image](https://github.com/AIVLE-School-Third-Big-Project/dancify/assets/124374862/38937624-2a60-4f79-85c9-6f95425797ab)

<br>

## **4. 기술 스택**

| 영역 | 기술 |
| :-: | :-: |
| **프론트엔드** | ![Typescript](https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=Next.js&logoColor=white) |
| **백엔드**  | ![Django](https://img.shields.io/badge/-Django-092E20?style=flat-square&logo=Django&logoColor=white) ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white) ![AWS S3](https://img.shields.io/badge/-AWS%20S3-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white) |
| **인공지능**  | ![TensorFlow.js](https://img.shields.io/badge/-TensorFlow.js-FF6F00?style=flat-square&logo=TensorFlow&logoColor=white) ![Mediapipe](https://img.shields.io/badge/-Mediapipe-00A6D6?style=flat-square&logo=Google&logoColor=white) ![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?style=flat-square&logo=OpenCV&logoColor=white) |
| **인프라** | ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white) ![AWS EC2](https://img.shields.io/badge/-AWS%20EC2-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white) ![Nginx](https://img.shields.io/badge/-Nginx-009639?style=flat-square&logo=Nginx&logoColor=white) ![AWS Lambda](https://img.shields.io/badge/-AWS%20Lambda-FF9900?style=flat-square&logo=Amazon%20AWS&logoColor=white) |
| **UI/UX** | ![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |
| **협업** | ![Github](https://img.shields.io/badge/-Github-181717?style=flat-square&logo=GitHub&logoColor=white) ![Discord](https://img.shields.io/badge/-Discord-7289DA?style=flat-square&logo=Discord&logoColor=white) ![Microsoft Teams](https://img.shields.io/badge/-Microsoft%20Teams-6264A7?style=flat-square&logo=Microsoft%20Teams&logoColor=white) |


<br>

## **5. 데이터셋**
![K-POP 안무 영상](https://github.com/AIVLE-School-Third-Big-Project/dancify/assets/124374862/054e2b24-fb6d-43fd-a520-b4ac7fdc9e1b)
[데이터셋 페이지로 이동 🚀](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=52)

<br>

## **6. 프로젝트 팀원 소개**

<table>
  <tr>
    <td align="center"><a href="https://github.com/kimyoo04"><img src="https://avatars.githubusercontent.com/u/58503130?v=4" width="100px;"></td>
    <td align="center"><a href="https://github.com/bfmeef"><img src="https://avatars.githubusercontent.com/u/24477729?&v=4" width="100px;"></td>
    <td align="center"><a href="https://github.com/wath1457"><img src="https://avatars.githubusercontent.com/u/93395614?v=4" width="100px;"></td>
    <td align="center"><a href="https://github.com/dptcldpa"><img src="https://avatars.githubusercontent.com/u/116916268?v=4" width="100px;"></td>
    <td align="center"><a href="https://github.com/heewon00"><img src="https://avatars.githubusercontent.com/u/55778040?v=4" width="100px;"></td>
    <td align="center"><a href="https://github.com/Yujun-Won"><img src="https://avatars.githubusercontent.com/u/124374862?v=4" width="100px;"></td>
    <td align="center"><a href="https://github.com/Leechansol"><img src="https://avatars.githubusercontent.com/u/18729932?v=4" width="100px;"></td>
  </tr>
  <tr>
    <td align="center"><b>김유 (팀장)</b></td>
    <td align="center"><b>박수민</b></td>
    <td align="center"><b>장혁</b></td>
    <td align="center"><b>조해민</b></td>
    <td align="center"><b>박희원</b></td>
    <td align="center"><b>원유준</b></td>
    <td align="center"><b>이찬솔</b></td>
  </tr>
  <tr>
    <td align="center"><b>FE</b></td>
    <td align="center"><b>BE</b></td>
    <td align="center"><b>BE</b></td>
    <td align="center"><b>BE</b></td>
    <td align="center"><b>AI</b></td>
    <td align="center"><b>AI</b></td>
    <td align="center"><b>AI</b></td>
  </tr>
</table>

<br>

## **7. 실행 방법**

### 1. 환경변수 설정
- 프로젝트를 실행하기 전에 `.env` 파일을 설정해야 합니다.
- `.env` 파일을 프로젝트 루트 디렉토리에 생성하고 아래와 같이 키(key)를 작성하세요.
```
# nextjs
NEXT_PUBLIC_ENV_API_DOMAIN
NEXT_PUBLIC_ENV_API_URL
NEXT_PUBLIC_ENV_DOMAIN
NEXT_PUBLIC_ENV_JWT_SECRET_KEY

# django
DJANGO_SECRET_KEY
DJANGO_TIME_ZONE
DJANGO_LANGUAGE_CODE
DJANGO_NEXTJS_URL

# S3
DJANGO_S3_ACCESS_KEY_ID
DJANGO_S3_SECRET_ACCESS_KEY

# MYSQL
MYSQL_DATABASE
MYSQL_ROOT_PASSWORD
MYSQL_HOST
MYSQL_USER
MYSQL_PASSWORD
```

### 2. Docker를 통한 실행

```docker
docker-compose -f docker-compose-front.yml
docker-compose -f docker-compose-back.yml
```
