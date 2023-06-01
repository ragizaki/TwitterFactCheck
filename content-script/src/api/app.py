from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
)

app = Flask(__name__)

@app.route('/', methods = ['POST'])
def fact_check_tweet():
    category_map = {
        '0': 'False',
        '1': 'True',
        '2': 'Partially True',
        '3': 'Unverifiable',
    }
    tweet_content = request.form.get('tweetContent')

    chat = ChatOpenAI(temperature = 0.2)
    human_template = "{text}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    system_message = "You are a fact-checking assistant. Please fact-check the following messages to the best of your ability. Please keep your response to 40 words. Can you please categorize the tweet into one of three categories: true, false or unverifiable. Please ensure that the first word of your response is one of the categories, followed by a space, and then your reasoning."
    chat_prompt = ChatPromptTemplate.from_messages([system_message, human_message_prompt])

    openai_response = chat(chat_prompt.format_prompt(text = tweet_content))

    category_index = openai_response.split()[0]
    tweet_category = category_map[category_index]
    verified_response = openai_response.split()[1:].join(' ')

    return jsonify({ 'tweetCategory': tweet_category, 'verifiedResponse': verified_response })



    


