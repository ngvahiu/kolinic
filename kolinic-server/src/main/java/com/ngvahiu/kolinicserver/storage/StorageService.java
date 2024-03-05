package com.ngvahiu.kolinicserver.storage;

import java.io.File;
import java.io.FileOutputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class StorageService {
	@Value("${application.bucket.name}")
	private String bucketName;
	@Value("${application.bucket.url}")
	private String bucketUrl;

	private final AmazonS3 s3Client;

	public String uploadFile(MultipartFile file, String folder) {
		String extension = this.getFileExtension(file.getOriginalFilename());
		String fileName = System.currentTimeMillis() + "." + (extension == null ? "png" : extension);
		File fileObj = this.convertMultiPartFileToFile(file);
		s3Client.putObject(new PutObjectRequest(bucketName, folder + "/" + fileName, fileObj));
		fileObj.delete();
		return bucketUrl + "/" + folder + "/" + fileName;
	}

	public String deleteFile(String url) {
		if(url != null) {
			try {
				String[] parts = url.split(bucketUrl + "/");
				s3Client.getObject(bucketName, parts[1]);
				s3Client.deleteObject(bucketName, parts[1]);
				return url + " removed...";
			} catch (Exception e) {
				return url + " does not exist";
			}			
		}
		return null;
	}
	
	private String getFileExtension(String fileName) {
		int index = fileName.lastIndexOf('.');
		if (index > 0) {
		  return fileName.substring(index + 1);
		}
		return null;
	}

	private File convertMultiPartFileToFile(MultipartFile file) {
		File convertedFile = new File(file.getOriginalFilename());
		try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
			fos.write(file.getBytes());
		} catch (Exception e) {
			log.error("Error converting multipartFile to file", e.getMessage());
		}
		return convertedFile;
	}
}
