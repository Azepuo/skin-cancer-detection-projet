from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Generic, TypeVar, Any
from datetime import datetime

T = TypeVar("T")

# Generic API Response Wrapper
class ApiResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    message: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Authentication Schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenData(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenPayload(BaseModel):
    user_id: int
    email: str
    exp: Optional[datetime] = None

# Analysis Schemas
class ScoreInfo(BaseModel):
    label: str
    confidence: float
    description: Optional[str] = None

class AnalysisBase(BaseModel):
    prediction: str
    confidence: float
    all_scores: list[ScoreInfo]

class AnalysisCreate(AnalysisBase):
    image_path: str
    user_id: int

class AnalysisResponse(AnalysisBase):
    id: int
    user_id: int
    image_path: str
    created_at: datetime

    class Config:
        from_attributes = True

class AnalysisHistoryItem(BaseModel):
    id: int
    prediction: str
    confidence: float
    created_at: datetime
    image_path: str

    class Config:
        from_attributes = True
