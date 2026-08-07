import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  const logoScale = useRef(new Animated.Value(0.2)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  const ringScale = useRef(new Animated.Value(0.8)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;

  const ring2Scale = useRef(new Animated.Value(0.8)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;

  const lineLeftWidth = useRef(new Animated.Value(0)).current;
  const lineRightWidth = useRef(new Animated.Value(0)).current;

  const dotScale = useRef(new Animated.Value(0)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;

  const dashOpacity = useRef(new Animated.Value(0)).current;

  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;

  const particle1Opacity = useRef(new Animated.Value(0)).current;
  const particle1Y = useRef(new Animated.Value(0)).current;
  const particle2Opacity = useRef(new Animated.Value(0)).current;
  const particle2Y = useRef(new Animated.Value(0)).current;
  const particle3Opacity = useRef(new Animated.Value(0)).current;
  const particle3Y = useRef(new Animated.Value(0)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const floatParticles = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(particle1Opacity, { toValue: 0.6, duration: 400, useNativeDriver: true }),
          Animated.timing(particle1Y, { toValue: -30, duration: 1500, useNativeDriver: true }),
          Animated.timing(particle1Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.delay(200),
          Animated.timing(particle2Opacity, { toValue: 0.5, duration: 400, useNativeDriver: true }),
          Animated.timing(particle2Y, { toValue: -25, duration: 1400, useNativeDriver: true }),
          Animated.timing(particle2Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(particle3Opacity, { toValue: 0.4, duration: 400, useNativeDriver: true }),
          Animated.timing(particle3Y, { toValue: -35, duration: 1300, useNativeDriver: true }),
          Animated.timing(particle3Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ]).start();
    };

    const pulseRing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(ringScale, { toValue: 1.4, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            Animated.timing(ringOpacity, { toValue: 0.3, duration: 200, useNativeDriver: true }),
          ]),
          Animated.timing(ringOpacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
          Animated.timing(ringScale, { toValue: 0.8, duration: 0, useNativeDriver: true }),
        ]),
        { iterations: 3 }
      ).start();
    };

    const pulseRing2 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(400),
          Animated.parallel([
            Animated.timing(ring2Scale, { toValue: 1.6, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            Animated.timing(ring2Opacity, { toValue: 0.2, duration: 200, useNativeDriver: true }),
          ]),
          Animated.timing(ring2Opacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
          Animated.timing(ring2Scale, { toValue: 0.8, duration: 0, useNativeDriver: true }),
        ]),
        { iterations: 3 }
      ).start();
    };

    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(200),

      Animated.spring(dotScale, {
        toValue: 1,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(lineLeftWidth, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(lineRightWidth, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(dashOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      Animated.delay(1000),

      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) onFinish();
    });

    setTimeout(() => {
      pulseRing();
      pulseRing2();
      floatParticles();
    }, 800);
  }, []);

  const animatedLineW = lineLeftWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.2],
  });

  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <Animated.View style={[styles.particle, styles.particle1, { opacity: particle1Opacity, transform: [{ translateY: particle1Y }] }]} />
      <Animated.View style={[styles.particle, styles.particle2, { opacity: particle2Opacity, transform: [{ translateY: particle2Y }] }]} />
      <Animated.View style={[styles.particle, styles.particle3, { opacity: particle3Opacity, transform: [{ translateY: particle3Y }] }]} />

      <Animated.View
        style={[
          styles.ring,
          {
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ring,
          styles.ring2,
          {
            opacity: ring2Opacity,
            transform: [{ scale: ring2Scale }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }, { rotate: spin }],
          },
        ]}
      >
        <Image
          source={require('../assets/RU.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.dividerRow}>
        <Animated.View style={[styles.line, { width: animatedLineW }]} />
        <Animated.View
          style={[
            styles.dot,
            { transform: [{ scale: dotScale }] },
          ]}
        />
        <Animated.View style={[styles.line, { width: animatedLineW }]} />
      </View>

      <View style={styles.textBlock}>
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [
                { translateY: titleTranslateY },
                { scale: titleScale },
              ],
            },
          ]}
        >
          RU
        </Animated.Text>

        <View style={styles.subtitleRow}>
          <Animated.Text style={[styles.dash, { opacity: dashOpacity }]}>
            {'—  '}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }],
              },
            ]}
          >
            Registro de Usuarios
          </Animated.Text>
          <Animated.Text style={[styles.dash, { opacity: dashOpacity }]}>
            {'  —'}
          </Animated.Text>
        </View>
      </View>

      <Animated.Text style={[styles.footer, { opacity: footerOpacity }]}>
        v1.0
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  ring: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#38BDF8',
    top: height * 0.5 - 75 - 50,
  },
  ring2: {
    borderColor: '#7DD3FC',
    borderWidth: 1.5,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#38BDF8',
  },
  particle1: {
    width: 5,
    height: 5,
    top: height * 0.42,
    left: width * 0.25,
  },
  particle2: {
    width: 4,
    height: 4,
    top: height * 0.38,
    right: width * 0.2,
    backgroundColor: '#7DD3FC',
  },
  particle3: {
    width: 3,
    height: 3,
    top: height * 0.45,
    right: width * 0.35,
    backgroundColor: '#BAE6FD',
  },
  logoWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  logo: {
    width: 130,
    height: 130,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    height: 1.5,
    backgroundColor: '#CBD5E1',
    borderRadius: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#38BDF8',
    marginHorizontal: 12,
  },
  textBlock: {
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 10,
    marginBottom: 10,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dash: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '300',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748B',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    fontSize: 12,
    color: '#CBD5E1',
    letterSpacing: 2,
  },
});
