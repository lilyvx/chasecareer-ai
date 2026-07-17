package com.vy.chase;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseHandler;

public class ThrowawayTest {
    public static void main(String[] args) throws Exception {
        VertexAI vertexai = new VertexAI("chase-career-forecaster", "asia-southeast1");
        GenerativeModel model = new GenerativeModel("gemini-2.5-flash", vertexai);

        var response = model.generateContent("Hello who are you and what do you do?");
        System.out.println(ResponseHandler.getText(response));
    
    }
    
}
