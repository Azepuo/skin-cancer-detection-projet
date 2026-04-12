from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import User, Analysis
from schemas import AnalysisResponse, AnalysisHistoryItem, ApiResponse
from auth import get_current_user

router = APIRouter(prefix="/analysis", tags=["Analysis"])

@router.get("/history", response_model=ApiResponse[List[AnalysisHistoryItem]])
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analyses = db.query(Analysis).filter(Analysis.user_id == current_user.id).order_by(Analysis.created_at.desc()).all()
    return ApiResponse(
        success=True,
        data=analyses
    )

@router.get("/{analysis_id}", response_model=ApiResponse[AnalysisResponse])
def get_analysis_details(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analysis = db.query(Analysis).filter(
        Analysis.id == analysis_id,
        Analysis.user_id == current_user.id
    ).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    return ApiResponse(
        success=True,
        data=analysis
    )

@router.delete("/{analysis_id}", response_model=ApiResponse[bool])
def delete_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analysis = db.query(Analysis).filter(
        Analysis.id == analysis_id,
        Analysis.user_id == current_user.id
    ).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    db.delete(analysis)
    db.commit()
    
    return ApiResponse(
        success=True,
        data=True,
        message="Analysis deleted successfully"
    )
