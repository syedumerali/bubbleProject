package com.blitzapp.bubbleleaf;
import android.os.Bundle;

import com.blitzapp.animatedsplash.animation.AddImageView;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import static com.blitzapp.animatedsplash.animation.AddImageView.FIT_CENTER;
import static com.blitzapp.animatedsplash.animation.AddImageView.FIT_END;
import static com.blitzapp.animatedsplash.animation.AddImageView.FIT_XY;
import static com.blitzapp.animatedsplash.animation.AddImageView.getCenterX;
import static com.blitzapp.animatedsplash.animation.AddImageView.getCenterY;
import static com.blitzapp.animatedsplash.animation.Splash.SCALE;
import static com.blitzapp.animatedsplash.animation.Splash.SLIDE;
import static com.blitzapp.animatedsplash.animation.Splash.SPLASHSLIDELEFT;
import static com.blitzapp.animatedsplash.animation.Splash.createSplashView;
import static com.blitzapp.animatedsplash.animation.Splash.performSingleAnimation;
import static com.blitzapp.animatedsplash.animation.Splash.screenHeight;
import static com.blitzapp.animatedsplash.animation.Splash.screenWidth;
import static com.blitzapp.animatedsplash.animation.Splash.setBackgroundImage;
import static com.blitzapp.animatedsplash.animation.Splash.setSplashHideAnimation;
import static com.blitzapp.animatedsplash.animation.Splash.setSplashHideDelay;
import static com.blitzapp.animatedsplash.animation.Splash.splashShow;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        // initiateSplash();
    }

    @Override
    protected String getMainComponentName() {
        return "BubbleLeaf";
    }

    public void initiateSplash() {

        // create dialog
        createSplashView(MainActivity.this);

        //set background color to view
        setBackgroundImage(R.drawable.splash);

        // set splash hide animation
        setSplashHideAnimation(SPLASHSLIDELEFT);

        // set splash hide delay
        setSplashHideDelay(1500);

        // create and add images to view
        AddImageView logoimage = new AddImageView(R.drawable.logo, screenHeight * 0.18, screenWidth * 0.45, getCenterX(screenWidth * 0.45), getCenterY(screenHeight * 0.18), FIT_CENTER, false);


        // add group animation
//        GroupAnimation group1 = new GroupAnimation();
//        group1.performGroupAnimation(logoimage, FADE, 400, 0f, 1f, false);
//        group1.performGroupAnimation(logoimage, SCALE, 400, 0f, 1f, 0f, 1f, false);

        // add single animation
//        performSingleAnimation(logoimage, SLIDE, 780, 0f, 0f, screenHeight * 0.2f, -screenHeight * 0.2f);
        performSingleAnimation(logoimage, SCALE,780, 0.5f, 1.5f, 0.5f, 1.5f);

//        performSingleAnimation(image2, FADE, 400, 0f, 1f);
//
//        performSingleAnimation(image3, FADE, 400, 0f, 1f);

        splashShow();

    }
}