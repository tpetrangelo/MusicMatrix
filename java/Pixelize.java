import java.awt.*;
import java.awt.image.BufferedImage;

import java.io.*;
import java.util.ArrayList;

import javax.imageio.ImageIO;

class Pixelize {
   BufferedImage image;
   BufferedImage pixelImage = new BufferedImage(64, 64, BufferedImage.TYPE_INT_ARGB);

   int width;
   int height;
   
   ArrayList<Color> newPixels = new ArrayList<Color>();

   public Pixelize() {
      try {
         File input = new File("../images/current_song.jpg");
         image = ImageIO.read(input);
         width = 64;
         height = 64;

         int pixelCounter = 0;
         int rAvg = 0;
         int gAvg = 0;
         int bAvg = 0;

         for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {

               Color c = new Color(image.getRGB(j,i));
               newPixels.add(c);

            }
         }
         

         int newMatrixCount = 0;

         for (int i = 0; i < 64; i++) {
            for (int j = 0; j < 64; j++) {

               pixelImage.setRGB(j, i, newPixels.get(newMatrixCount).getRGB());
               newMatrixCount++;
            }
         }



         try {
            File outputfile = new File("../images/current_song_pixel.png");
            boolean written = ImageIO.write(pixelImage, "png", outputfile);
            System.out.println("File written? " + written);
         } catch (IOException e) {
            System.out.println(e);
         }

      } catch (Exception e) {
      }
   }

   static public void main(String args[]) throws Exception {
      Pixelize obj = new Pixelize();
   }
}
