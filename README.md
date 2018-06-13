# stt_analyser_skeleton
Purpose:
Simple node.js program to demonstrate how to use a Watson Services chain of Speech to Text, Language Translator and Natural Language Understanding
This code was done for a evaluation. The Use Case was to transcribe the audio part of a video and compare it with subtitles in a different language. Because subtitle and audio is seldom 1:1 a mechanism has to be used to compare if audio and subtitle have the same meaning. This was done via Watson NLU. The compare of the NLU output was done manually.

Installation and run:

>> npm install 
(keep the defaults except the node file (node.js))

Install the IBM Watson SDK:
>> npm install dotenv watson-developer-cloud -S

Install the dotenv package and save this dependency in the package.json. 
Use dotenv to store the Watson Conversation service username and password in the environment:
>> npm install dotenv -S

Edit the .env file (and set userID and password for the Watson services)

Run
>> node node.js

The Output represents the JSON answers from the IBM Watson Services
