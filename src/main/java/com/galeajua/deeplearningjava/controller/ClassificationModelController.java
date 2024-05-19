package com.galeajua.deeplearningjava.controller;

import java.io.IOException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.galeajua.deeplearningjava.service.inference.Inference;

import ai.djl.ModelException;
import ai.djl.translate.TranslateException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;




@RestController
@RequestMapping(value = "/api/v1/malariaCellClassifier")
public class ClassificationModelController {
    
    private final Inference inference;

    public ClassificationModelController(Inference inference) {
        this.inference = inference;
    }

    @PostMapping(value = "/getSimpleClassification")
    public String classifyImage(@RequestParam(value = "image") MultipartFile image) throws TranslateException, IOException, ModelException {
        try {
            return inference.predict(image.getBytes()).toJson();
        } catch (Exception e)  {
            return null;
        }
    }
    
}
