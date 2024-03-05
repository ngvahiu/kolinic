package com.ngvahiu.kolinicserver.feedback;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ngvahiu.kolinicserver.feedback.dtos.CreateFeedbackDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("feedbacks")
@RequiredArgsConstructor
public class FeedbackController {
	private final FeedbackService feedbackService;

	@PostMapping
	public ResponseEntity<APIResponse<?>> createFeedback(@Valid @RequestBody CreateFeedbackDTO createFeedbackDto) {
		APIResponse<?> res = feedbackService.createDrug(createFeedbackDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
}
