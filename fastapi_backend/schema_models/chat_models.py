from pydantic import BaseModel, Field
from typing import List, Union
from uuid import UUID
from langchain_core.messages import AIMessage, HumanMessage




class ChatRequest(BaseModel):
    user_question: str
    conversation_history: list


class QueryRequest(BaseModel):
    user_question: Union[str, None]
    url: Union[str, None]
    conversation_history: List[dict]


class ConversationHistoryRequest(BaseModel):
    conversation_history: List[dict]


# class ConversationHistoryRequest(BaseModel):
#     conversation_history: List[Union[AIMessage, HumanMessage]]