# Wordcraft

### 프로젝트 개요
ChatGPT API를 이용하여 단어를 생성하고, 사용자가 주어진 단어들로 문장을 작성하여 제출하면 ChatGPT가 창의성, 문장력, 재치성에 대해 채점을 해주는 미니게임입니다.
단어 교체는 하루에 10번까지 가능합니다.
다른 유저들이 만든 문장을 구경할 수 있습니다.

### 기술스택
NextJS TypeScript TailwindCSS Supabase Vercel
(OpenAI API) (localStorage)

### 배포링크
https://www.hahagarden.dev

### 1분 소개 영상
<img src="https://github.com/user-attachments/assets/095e3083-6e83-4b88-bb48-e3c3ba62baba" width="500" height="750" />

### 폴더 구조
```
src
 ┣ api
 ┃ ┣ index.ts
 ┃ ┣ score.ts
 ┃ ┗ words.ts
 ┣ app
 ┃ ┣ api
 ┃ ┃ ┣ score
 ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┗ words
 ┃ ┃ ┃ ┗ route.ts
 ┃ ┣ community
 ┃ ┃ ┗ page.tsx
 ┃ ┣ complete
 ┃ ┃ ┗ page.tsx
 ┃ ┣ play
 ┃ ┃ ┗ page.tsx
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.tsx
 ┃ ┗ page.tsx
 ┣ components
 ┃ ┣ MainButton.tsx
 ┃ ┣ SecondaryButton.tsx
 ┃ ┣ SmallButton.tsx
 ┃ ┣ Spinner.tsx
 ┃ ┗ index.ts
 ┣ hooks
 ┃ ┣ index.ts
 ┃ ┣ useFetch.ts
 ┃ ┗ useLocalStorageState.ts
 ┣ lib
 ┃ ┣ sentences.ts
 ┃ ┗ supabase.ts
 ┗ types
 ┃ ┗ database.types.ts
```
