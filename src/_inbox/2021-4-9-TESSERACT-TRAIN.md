---
title: TESSERACT TRAIN
date: 2021-3-27
tags: 
  - ocr
  - tesseract
  - train
author: swjang
location: Seoul  
---

## 환경
1. tesseract 
```
$ sudo apt install tesract-ocr
$ sudo apt install libtesseract-dev
```

2. opencv

3. python
- python3 기본 설치되어 있음

```shell
$ sudo apt-get install python3-pip
$ sudo apt-get install python3-venv
```

```tip python 설치
$ sudo apt-get install python3
```

4. project 생성

- tesseract python project 생성 : venv 이용
```
$ cd ~/works/project
$ mkdir py-ocr && cd py-ocr
$ python3 -m venv .venv

```

```tip 관련 Library
- opencv library
pip install opencv-contrib-python
- tesseract library
pip install pytesseract
- image library
pip install pillow
```

- tesseract 학습 project 생성
```
$ cd ~/works/project
$ mkdir ocr && cd ocr
$ git clone https://github.com/tesseract-ocr/tesseract
$ git clone https://github.com/tesseract-ocr/langdata
$ git clone https://github.com/tesseract-ocr/tessdata_best
$ mkdir -p tesstutorial/engtrain
$ mkdir -p tesstutorial/engoutput
```

## 학습

1. 학습 대상폰트 복사
```shell
$ cd ~/works/project/ocr
$ sudo cp nanum-pen-script-v15-latin_korean-regular.ttf /usr/share/fonts
$ sudo chmod 644 /usr/share/fonts/nanum-pen-script-v15-latin_korean-regular.ttf
```

2. 최신(best) 학습 데이터 복사
```shell
$ cd ~/works/project/ocr/tesseract
$ cp ../tessdata_best/eng.traineddata ./tessdata
```

3. 학습 전 traineddata(best)로 Sample 이미지 OCR 시험
```shell
$ tesseract ../naum-pen-script-sample.PNG stdout -l eng --oem 1 --psm 3 --tessdata-dir ./tessdata
The quick brown Sox jumps over the lazy dog 1543. 12345(78%0
```

4. 학습 대상 폰트 lstm 데이터 생성
```shell
$ src/training/tesstrain.sh --fonts_dir /usr/share/fonts --lang eng --linedata_only --noextract_font_properties --langdata_dir ../langdata --tessdata_dir ./tessdata --exposures "0" --fontlist "Nanum Pen" --output_dir ../tesstutorial/engtrain
```

```tip 생성 데어터 확인
$ la ../tesstutorial/engtrain
total 388K
drwxr-x--- 2 swjang swjang 4.0K Apr 10 00:25 eng
-rw-r--r-- 1 swjang swjang 380K Apr 10 00:25 eng.Nanum_Pen.exp0.lstmf
-rw-r--r-- 1 swjang swjang   50 Apr 10 00:25 eng.training_files.txt
``

5. 학습 대상 폰트 lstm 데이터 생성
```shell
$ comb
ine_tessdata -e ./tessdata/eng.traineddata ../tesstutorial/engtrain/eng.lstm 
```

```tip 생성 데어터 확인
$ la ../tesstutorial/engtrain
total 12M
drwxr-x--- 2 swjang swjang 4.0K Apr 10 00:25 eng
-rw-r--r-- 1 swjang swjang 380K Apr 10 00:25 eng.Nanum_Pen.exp0.lstmf
-rw-r--r-- 1 swjang swjang  12M Apr 10 00:39 eng.lstm
-rw-r--r-- 1 swjang swjang   50 Apr 10 00:25 eng.training_files.txt
``

6. 학습 대상 폰트 학습
```shell
$ lstmtraining  --continue_from ../tesstutorial/engtrain/eng.lstm --old_traineddata ./tessdata/eng.traineddata --traineddata ../tesstutorial/engtrain/eng/eng.traineddata --model_output ../tesstutorial/engoutput/base --train_listfile ../tesstutorial/engtrain/eng.training_files.txt --max_iterations 3600
```

```tip 학습 데이터 확인
$ la ../tesstutorial/engoutput
total 502M
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:52 base0.008_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:51 base0.034_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:51 base0.117_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:50 base0.533_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:49 base0.592_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:49 base0.666_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:48 base0.761_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:47 base0.888_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:46 base1.066_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:46 base1.329_128.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:45 base1.75_124.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:44 base2.493_111.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:43 base4.163_76.checkpoint
-rw-r--r-- 1 swjang swjang 67M Apr 10 00:52 base_checkpoint
```

7. 학습 결과 적용
```shell
$ lstmtraining --stop_training --continue_from ../tesstutorial/engoutput/base_checkpoint --old_traineddata ./tessdata/eng.traineddata --traineddata ../tesstutorial/engtrain/eng/eng.traineddata --model_output ../tesstutorial/engoutput/eng.traineddata 
```

```tip 학습 결과 적용 데이터(eng.traineddata) 확인
$ la ../tesstutorial/engoutput
total 517M
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:52 base0.008_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:51 base0.034_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:51 base0.117_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:50 base0.533_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:49 base0.592_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:49 base0.666_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:48 base0.761_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:47 base0.888_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:46 base1.066_129.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:46 base1.329_128.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:45 base1.75_124.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:44 base2.493_111.checkpoint
-rw-r--r-- 1 swjang swjang 34M Apr 10 00:43 base4.163_76.checkpoint
-rw-r--r-- 1 swjang swjang 67M Apr 10 00:52 base_checkpoint
-rw-r--r-- 1 swjang swjang 16M Apr 10 00:59 eng.traineddata
```

8. 학습 후 traineddata로 Sample 이미지 OCR 시험
```shell
$ tesseract ../naum-pen-script-sample.PNG stdout -l eng --oem 1 --psm 3 --tessdata-dir ../tesstutorial/engoutput
The quick brown fox jumps over the lazy dog. 15131. 12345¢7890
```