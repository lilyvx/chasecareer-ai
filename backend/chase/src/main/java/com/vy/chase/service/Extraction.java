package com.vy.chase.service;

import java.io.IOException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class Extraction {

    public String extractText(MultipartFile file) throws IOException {

        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            
            PDFTextStripper stripper = new PDFTextStripper();

            String extractedstuff = stripper.getText(document);

            return extractedstuff != null ? extractedstuff.trim() : "" ;
        }

    }
}


/*notes for myself 

multipartfile represents uploaded file coming from http req (controller receives it then pass to filegetbytes

*/