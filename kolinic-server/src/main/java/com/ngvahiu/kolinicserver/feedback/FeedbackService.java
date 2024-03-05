package com.ngvahiu.kolinicserver.feedback;

import com.ngvahiu.kolinicserver.feedback.dtos.CreateFeedbackDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface FeedbackService {
	APIResponse<?> createDrug(@Valid CreateFeedbackDTO createFeedbackDto);
}
