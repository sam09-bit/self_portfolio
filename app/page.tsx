"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Terminal, Code, Cpu, Database, Globe, Layers, 
  Briefcase, Award, ChevronRight, Mail, 
  ExternalLink, Server, Smartphone, Monitor
} from 'lucide-react';

// --- Profile Card CSS Injection ---
const profileCardCSS = `
.pc-card-wrapper {
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-from-center: 0;
  --pointer-from-top: 0.5;
  --pointer-from-left: 0.5;
  --card-opacity: 0;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --background-x: 50%;
  --background-y: 50%;
  --grain: none;
  --icon: none;
  --behind-gradient: none;
  --behind-glow-color: rgba(0, 255, 255, 0.4);
  --behind-glow-size: 40%;
  --inner-gradient: none;
  --sunpillar-1: hsl(2, 100%, 73%);
  --sunpillar-2: hsl(53, 100%, 69%);
  --sunpillar-3: hsl(93, 100%, 69%);
  --sunpillar-4: hsl(176, 100%, 76%);
  --sunpillar-5: hsl(228, 100%, 74%);
  --sunpillar-6: hsl(283, 100%, 73%);
  --sunpillar-clr-1: var(--sunpillar-1);
  --sunpillar-clr-2: var(--sunpillar-2);
  --sunpillar-clr-3: var(--sunpillar-3);
  --sunpillar-clr-4: var(--sunpillar-4);
  --sunpillar-clr-5: var(--sunpillar-5);
  --sunpillar-clr-6: var(--sunpillar-6);
  --card-radius: 12px;
  perspective: 500px;
  transform: translate3d(0, 0, 0.1px);
  position: relative;
  touch-action: none;
  width: 100%;
}

.pc-behind {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--pointer-x) var(--pointer-y),
    var(--behind-glow-color) 0%,
    transparent var(--behind-glow-size)
  );
  filter: blur(40px) saturate(1.1);
  opacity: calc(0.8 * var(--card-opacity));
  transition: opacity 200ms ease;
}

.pc-card-wrapper:hover,
.pc-card-wrapper.active {
  --card-opacity: 1;
}

.pc-card {
  height: 480px;
  width: 100%;
  display: grid;
  border-radius: var(--card-radius);
  position: relative;
  background-blend-mode: color-dodge, normal, normal, normal;
  animation: glow-bg 12s linear infinite;
  box-shadow: rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px)
    calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px;
  transition: transform 1s ease;
  transform: translateZ(0) rotateX(0deg) rotateY(0deg);
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.2);
  backface-visibility: hidden;
  overflow: hidden;
}

.pc-card:hover,
.pc-card.active {
  transition: none;
  transform: translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
}

.pc-card-shell.entering .pc-card {
  transition: transform 180ms ease-out;
}

.pc-card-shell {
  position: relative;
  z-index: 1;
  width: 100%;
}

.pc-card * {
  display: grid;
  grid-area: 1/-1;
  border-radius: var(--card-radius);
  pointer-events: none;
}

.pc-inside {
  inset: 0;
  position: absolute;
  background-image: var(--inner-gradient);
  background-color: rgba(5, 5, 5, 0.9);
  transform: none;
}

.pc-shine {
  mask-image: var(--icon);
  mask-mode: luminance;
  mask-repeat: repeat;
  mask-size: 150%;
  mask-position: top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x));
  transition: filter 0.8s ease;
  filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5);
  animation: holo-bg 18s linear infinite;
  animation-play-state: running;
  mix-blend-mode: color-dodge;
}

.pc-shine,
.pc-shine::after {
  --space: 5%;
  --angle: -45deg;
  transform: translate3d(0, 0, 1px);
  overflow: hidden;
  z-index: 3;
  background: transparent;
  background-size: cover;
  background-position: center;
  background-image:
    repeating-linear-gradient(
      0deg,
      var(--sunpillar-clr-1) calc(var(--space) * 1),
      var(--sunpillar-clr-2) calc(var(--space) * 2),
      var(--sunpillar-clr-3) calc(var(--space) * 3),
      var(--sunpillar-clr-4) calc(var(--space) * 4),
      var(--sunpillar-clr-5) calc(var(--space) * 5),
      var(--sunpillar-clr-6) calc(var(--space) * 6),
      var(--sunpillar-clr-1) calc(var(--space) * 7)
    ),
    repeating-linear-gradient(
      var(--angle),
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 29%, 66%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    ),
    radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
    );
  background-position:
    0 var(--background-y),
    var(--background-x) var(--background-y),
    center;
  background-blend-mode: color, hard-light;
  background-size:
    500% 500%,
    300% 300%,
    200% 200%;
  background-repeat: repeat;
}

.pc-shine::before,
.pc-shine::after {
  content: '';
  background-position: center;
  background-size: cover;
  grid-area: 1/1;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.pc-card:hover .pc-shine,
.pc-card.active .pc-shine {
  filter: brightness(0.85) contrast(1.5) saturate(0.5);
  animation-play-state: paused;
}

.pc-card:hover .pc-shine::before,
.pc-card.active .pc-shine::before,
.pc-card:hover .pc-shine::after,
.pc-card.active .pc-shine::after {
  opacity: 1;
}

.pc-shine::before {
  background-image:
    linear-gradient(
      45deg,
      var(--sunpillar-4),
      var(--sunpillar-5),
      var(--sunpillar-6),
      var(--sunpillar-1),
      var(--sunpillar-2),
      var(--sunpillar-3)
    ),
    radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0, 0%, 70%) 0%, hsla(0, 0%, 30%, 0.2) 90%),
    var(--grain);
  background-size:
    250% 250%,
    100% 100%,
    220px 220px;
  background-position:
    var(--pointer-x) var(--pointer-y),
    center,
    calc(var(--pointer-x) * 0.01) calc(var(--pointer-y) * 0.01);
  background-blend-mode: color-dodge;
  filter: brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2))
    saturate(calc(0.5 + var(--pointer-from-center)));
  mix-blend-mode: luminosity;
}

.pc-shine::after {
  background-position:
    0 var(--background-y),
    calc(var(--background-x) * 0.4) calc(var(--background-y) * 0.5),
    center;
  background-size:
    200% 300%,
    700% 700%,
    100% 100%;
  mix-blend-mode: difference;
  filter: brightness(0.8) contrast(1.5);
}

.pc-glare {
  transform: translate3d(0, 0, 1.1px);
  overflow: hidden;
  background-image: radial-gradient(
    farthest-corner circle at var(--pointer-x) var(--pointer-y),
    hsl(180, 100%, 80%) 5%,
    hsla(207, 40%, 10%, 0.8) 90%
  );
  mix-blend-mode: overlay;
  filter: brightness(0.6) contrast(1.2);
  z-index: 4;
}

.pc-avatar-content {
  mix-blend-mode: luminosity;
  overflow: visible;
  transform: translateZ(2);
  backface-visibility: hidden;
}

.pc-avatar-content .avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 50%;
  transform-origin: 50% 100%;
  transform: translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0)
    scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01));
  bottom: -1px;
  backface-visibility: hidden;
  will-change: transform;
  transition: transform 120ms ease-out;
}

.pc-avatar-content::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  backdrop-filter: none;
  pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%);
}

.pc-user-info {
  position: absolute;
  --ui-inset: 15px;
  --ui-radius-bias: 6px;
  bottom: var(--ui-inset);
  left: var(--ui-inset);
  right: var(--ui-inset);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)));
  padding: 12px 14px;
  pointer-events: auto;
}

.pc-user-details {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pc-mini-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.3);
  flex-shrink: 0;
}

.pc-mini-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.pc-user-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 4px;
}

.pc-handle {
  font-size: 14px;
  font-weight: 700;
  color: #00ffff;
  line-height: 1;
  font-family: monospace;
}

.pc-status {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
}

.pc-contact-btn {
  border: 1px solid rgba(0, 255, 255, 0.4);
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #00ffff;
  background: rgba(0, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.pc-contact-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  transform: translateY(-1px);
}

.pc-content:not(.pc-avatar-content) {
  max-height: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
  transform: translate3d(
    calc(var(--pointer-from-left) * -6px + 3px),
    calc(var(--pointer-from-top) * -6px + 3px),
    0.1px
  );
  z-index: 5;
  mix-blend-mode: luminosity;
}

.pc-details {
  width: 100%;
  position: absolute;
  top: 2em;
  display: flex;
  flex-direction: column;
}

.pc-details h3 {
  font-weight: 700;
  font-size: 24px;
  margin: 0;
  color: #fff;
  text-shadow: 0 0 10px rgba(0,255,255,0.5);
}

.pc-details p {
  font-weight: 600;
  position: relative;
  font-size: 14px;
  margin: 0 auto;
  color: #00ffff;
  margin-top: 4px;
}

@keyframes glow-bg {
  0% { --bgrotate: 0deg; }
  100% { --bgrotate: 360deg; }
}

@keyframes holo-bg {
  0% { background-position: 0 var(--background-y), 0 0, center; }
  100% { background-position: 0 var(--background-y), 90% 90%, center; }
}
`;

// --- Interfaces for ProfileCard ---
interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

// --- TypeScript Converted ProfileCard Component ---
const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '/profile.jpeg',
  iconUrl = '',
  grainUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Sameer Morya',
  title = 'Architect & AI Engineer',
  handle = 'sameer-morya029',
  status = 'System Online',
  contactText = 'Initialize',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#050505 0%,#0a1a2a 100%)';
  const ANIMATION_CONFIG = {
    INITIAL_DURATION: 1200,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
    DEVICE_BETA_OFFSET: 20,
    ENTER_TRANSITION_MS: 180
  };

  const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
  const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
  const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) => 
    round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) {
        wrap.style.setProperty(k, v);
      }
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent | MouseEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback((event: Event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event as PointerEvent, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback((event: Event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event as PointerEvent, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback((event: Event) => {
      const e = event as DeviceOrientationEvent;
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = e;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine || typeof window === 'undefined') return;

    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener('pointerenter', handlePointerEnter);
    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerleave', handlePointerLeave);

    const handleClick = () => {
      if (!enableMobileTilt || window.location.protocol !== 'https:') return;
      
      const anyMotion = window.DeviceMotionEvent as any;
      
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', handlePointerEnter);
      shell.removeEventListener('pointermove', handlePointerMove);
      shell.removeEventListener('pointerleave', handlePointerLeave);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(0, 255, 255, 0.4)',
      '--behind-glow-size': behindGlowSize ?? '40%'
    } as React.CSSProperties),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: profileCardCSS }} />
      <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
        {behindGlowEnabled && <div className="pc-behind" />}
        <div ref={shellRef} className="pc-card-shell">
          <section className="pc-card">
            <div className="pc-inside">
              <div className="pc-shine" />
              <div className="pc-glare" />
              <div className="pc-content pc-avatar-content">
                <img
                  className="avatar"
                  src={avatarUrl}
                  alt={`${name || 'User'} avatar`}
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).style.opacity = '0.1';
                  }}
                />
                {showUserInfo && (
                  <div className="pc-user-info">
                    <div className="pc-user-details">
                      <div className="pc-mini-avatar">
                        <img
                          src={miniAvatarUrl || avatarUrl}
                          alt={`${name || 'User'} mini avatar`}
                          loading="lazy"
                          onError={e => {
                            const t = e.target as HTMLImageElement;
                            t.style.opacity = '0.5';
                            t.src = avatarUrl;
                          }}
                        />
                      </div>
                      <div className="pc-user-text">
                        <div className="pc-handle">@{handle}</div>
                        <div className="pc-status">● {status}</div>
                      </div>
                    </div>
                    <button
                      className="pc-contact-btn"
                      onClick={handleContactClick}
                      style={{ pointerEvents: 'auto' }}
                      type="button"
                      aria-label={`Contact ${name || 'user'}`}
                    >
                      {contactText}
                    </button>
                  </div>
                )}
              </div>
              <div className="pc-content">
                <div className="pc-details">
                  <h3>{name}</h3>
                  <p>{title}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

// --- Typewriter Hook ---
const useTypewriter = (text: string, speed = 30, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeChar, speed);
        } else {
          setIsTyping(false);
        }
      };
      typeChar();
    };

    timeoutId = setTimeout(startTyping, delay);
    return () => clearTimeout(timeoutId);
  }, [text, speed, delay]);

  return { displayText, isTyping };
};

// --- Main Application ---
export default function App() {
  const [activeTab, setActiveTab] = useState('sys_overview');
  
  const introText = `> INITIALIZING SYSTEM...\n> ACCESSING SECURE CORE...\n> USER: SAMEER MORYA FOUND.\n> ROLE: FULL STACK ARCHITECT & AI ENGINEER.\n> STATUS: ONLINE AND READY TO SCALE.`;
  const { displayText: terminalText } = useTypewriter(introText, 25, 500);

  const skills = [
    { category: "Core Backend & AI", icon: <Cpu size={18}/>, items: ["Python", "FastAPI", "C++", "RESTful APIs", "Microservices"] },
    { category: "Full Stack (MERN)", icon: <Globe size={18}/>, items: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"] },
    { category: "Mobile Dev", icon: <Smartphone size={18}/>, items: ["Flutter", "Dart", "Firebase", "Provider/Riverpod"] },
    { category: "DevOps & Infrastructure", icon: <Server size={18}/>, items: ["Docker", "Linux Server", "PostgreSQL", "Git/GitHub"] }
  ];

  const experience = [
    {
      role: "Freelance Software Developer",
      company: "Self-Employed",
      date: "Dec 2025 - Present",
      details: ["Architected & deployed a full Academic Management System using MERN stack.", "Containerized via Docker and hosted on a Linux server.", "Developed modules for student records, attendance, and admin dashboards."]
    },
    {
      role: "Strategy & Operations Associate",
      company: "Seekmycourse (Founder's Office)",
      date: "Jan 2025 - Present",
      details: ["Drive high-priority projects across strategy, operations, and growth.", "Manage cross-functional initiatives and build investor materials.", "Streamline scaling processes to support executive decision-making."]
    },
    {
      role: "Project Lead",
      company: "Next Gen Community",
      date: "Jan 2025 - Present",
      details: ["Led technical vision and architecture for the primary web platform.", "Directed a cross-functional student team through the full lifecycle.", "Enhanced system performance and delivered new scalable features."]
    },
    {
      role: "Creative Intern",
      company: "Meshcraft & Somaiya Space Research",
      date: "Jan 2024 - Jun 2024",
      details: ["Optimized content creation processes, reducing turnaround time by 30%.", "Streamlined editing and approval stages for improved team efficiency."]
    }
  ];

  // WITH GITHUB LINKS ATTACHED AND BUTTONS EXPLICIT
  const projects = [
    {
      name: "AMS ERP (NTA-Level)",
      type: "AI-Powered EdTech ERP",
      tech: ["Next.js", "PostgreSQL", "AI Generation", "ERP"],
      desc: "End-to-end Academic Management System featuring an AI-driven NTA-style exam generator, dynamic student testing portals, and dedicated parent dashboards for performance tracking.",
      link: "https://github.com/sam09-bit"
    },
    {
      name: "EcoLens",
      type: "AI Carbon Analyzer",
      tech: ["Computer Vision", "AI Analysis", "Full-Stack"],
      desc: "Intelligent environmental tool. Analyzes user-uploaded product images to calculate their precise carbon footprint, providing ecological impact metrics and suggesting sustainable alternatives.",
      link: "https://github.com/prisha-jpg/ecolens_making.git"
    },
    {
      name: "BioSync Mobile",
      type: "Health & Navigation AI",
      tech: ["Flutter", "Google ML Kit", "Google API"],
      desc: "Advanced mobile health application integrating a footstep tracker, shortest-route finder, and a custom heartbeat monitor utilizing the device flashlight and Google ML Kit for real-time biometrics.",
      link: "https://github.com/sam09-bit/route_finder_app.git"
    },
    {
      name: "Finova",
      type: "AI Stock Predictor",
      tech: ["MERN", "Python", "FastAPI", "Tailwind"],
      desc: "Responsive stock analysis dashboard powered by a Python/FastAPI backend. Delivers AI-driven market analysis, recommendations, and risk assessment via a polished interface.",
      link: "https://github.com/sam09-bit/Finova.git"
    },
    {
      name: "FinEase",
      type: "MSME Financial Predictor",
      tech: ["Python", "XGBoost", "Docker", "Full-Stack"],
      desc: "Containerized financial platform with real-time KPI tracking. Uses XGBoost ML engine to analyze ledgers and generate accurate 6-month predictive cash flow forecasts.",
      link: "https://github.com/Organic42/Finesss.git"
    },
    {
      name: "NeuroCoach AI",
      type: "Reinforcement Learning Env",
      tech: ["Python ML", "Backend API", "Docker"],
      desc: "Full-stack ML platform delivering real-time coaching insights. Uses custom AI models for data analysis, serving predictions through a robust backend API.",
      link: "https://github.com/sam09-bit/neurocoach_ai.git"
    },
    {
      name: "Support Microservice",
      type: "Ticketing System",
      tech: ["MERN", "Mongoose", "JWT", "Multer"],
      desc: "Standalone Help & Support system with secure file uploads, JWT-authenticated admin panel, and an optimized Tailwind CSS interface.",
      link: "https://github.com/sam09-bit/help-and-support-system-.git"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono overflow-x-hidden selection:bg-cyan-900 selection:text-cyan-100 pb-20 relative">
      
      {/* Subdued Techy Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#00ffff0a_1px,transparent_1px),linear-gradient(to_bottom,#00ffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Top Navigation / Status Bar */}
      <nav className="fixed top-0 w-full bg-[#050505]/80 backdrop-blur-md border-b border-cyan-900/50 z-50 px-6 py-3 flex justify-between items-center text-xs tracking-widest">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal size={16} />
          <span className="font-bold">SYS.ADMIN // SAMEER</span>
        </div>
        <div className="hidden md:flex gap-6 text-gray-500">
          <span className="animate-pulse text-green-500">● SECURE CONNECTION</span>
          <span>LAT: 18.9902 N</span>
          <span>MEM: 64TB</span>
        </div>
      </nav>

      <main className="relative z-10 pt-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Column: 3D Holographic Profile HUD */}
        <aside className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-6 md:sticky md:top-24 h-fit">
          
          <ProfileCard 
            name="Sameer Morya"
            title="Architect & AI Engineer"
            handle="sam09-bit"
            status="System Online"
            contactText="Connect"
            avatarUrl="/profile.jpeg" 
            onContactClick={() => window.location.href = "mailto:moryasameer59@gmail.com"}
          />

          {/* Expanded Quick Links Menu */}
          <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-4 shadow-[0_0_15px_rgba(0,255,255,0.05)] text-sm space-y-4">
             <a href="mailto:moryasameer59@gmail.com" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Mail size={16} className="text-cyan-500"/> moryasameer59@gmail.com
              </a>
              <a href="tel:+918055464262" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Smartphone size={16} className="text-cyan-500"/> +91 8055464262
              </a>
              <a href="https://github.com/sam09-bit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Code size={16} className="text-cyan-500"/> GitHub: sam09-bit
              </a>
              <a href="https://linkedin.com/in/sameer-morya029" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Briefcase size={16} className="text-cyan-500"/> LinkedIn Profile
              </a>
              <a href="https://sameermorya.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Globe size={16} className="text-cyan-500"/> sameermorya.com
              </a>
          </div>

          {/* Module Navigation */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 flex flex-col gap-1">
            {[
              { id: 'sys_overview', label: 'SYS_OVERVIEW', icon: <Monitor size={16}/> },
              { id: 'experience', label: 'EXPERIENCE_LOG', icon: <Briefcase size={16}/> },
              { id: 'projects', label: 'PROJECT_ARCHIVE', icon: <Code size={16}/> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm text-left transition-all ${
                  activeTab === tab.id 
                  ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_10px_rgba(0,255,255,0.1)]' 
                  : 'hover:bg-gray-900 text-gray-500 border border-transparent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Column: Dynamic Content Area */}
        <section className="w-full md:w-2/3 lg:w-3/4 min-h-[60vh]">
          
          {/* TAB: SYSTEM OVERVIEW (Hero & Skills) */}
          {activeTab === 'sys_overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              
              {/* Terminal Hero */}
              <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-lg p-6 font-mono text-sm shadow-[0_0_15px_rgba(0,255,255,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50 z-10"></div>
                <div className="flex gap-2 mb-4 pb-4 border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <pre className="whitespace-pre-wrap text-cyan-400 leading-relaxed min-h-[120px]">
                  {terminalText}
                  <span className="animate-pulse text-white">_</span>
                </pre>
              </div>

              {/* Education & Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-5 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-500 mb-2"><Award size={20}/></div>
                  <h3 className="text-white font-bold mb-1">B.Tech - Robotics & AI</h3>
                  <p className="text-xs text-gray-400">K.J. Somaiya College of Engineering</p>
                  <p className="text-cyan-400 mt-2 font-bold">Class of 2027 • GPA: 9.6</p>
                </div>
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-5 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-500 mb-2"><Layers size={20}/></div>
                  <h3 className="text-white font-bold mb-1">Key Achievements</h3>
                  <ul className="text-xs text-gray-400 mt-2 space-y-1">
                    <li className="flex items-center gap-2"><ChevronRight size={12} className="text-cyan-500"/> Top 5th - Strategy Storm (IIT Guwahati)</li>
                    <li className="flex items-center gap-2"><ChevronRight size={12} className="text-cyan-500"/> 1st Runner Up - JOAT (XIMB)</li>
                  </ul>
                </div>
              </div>

              {/* Tech Arsenal */}
              <div>
                <h3 className="text-lg text-white font-bold mb-4 flex items-center gap-2">
                  <Database className="text-cyan-500"/> THE ARSENAL
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skillGroup, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 group hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center gap-2 text-white mb-3 font-semibold">
                        <span className="text-cyan-500">{skillGroup.icon}</span>
                        {skillGroup.category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 rounded group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-transparent">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline Node */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-900 group-hover:bg-cyan-500 text-cyan-500 group-hover:text-black group-hover:shadow-[0_0_15px_#0ff] transition-all absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10">
                    <Briefcase size={16} />
                  </div>
                  
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-lg bg-[#0a0a0a] border border-gray-800 group-hover:border-cyan-500/50 transition-all ml-auto md:ml-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col mb-2">
                      <span className="text-cyan-400 text-xs font-bold tracking-wider mb-1">{exp.date}</span>
                      <h4 className="text-white text-lg font-bold">{exp.role}</h4>
                      <span className="text-cyan-600 text-sm">{exp.company}</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-2 mt-3">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-cyan-600 mt-0.5 shrink-0"/>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                  <div key={idx} className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 group hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.05)] transition-all flex flex-col h-full relative overflow-hidden">
                    {/* Futuristic corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        {/* Title is now a clickable link! */}
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-cyan-500 underline-offset-4">
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                        </a>
                        <p className="text-xs text-cyan-600 font-bold tracking-widest uppercase mt-1">{project.type}</p>
                      </div>
                      
                      {/* Highly visible SOURCE button replacing the tiny icon */}
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-900/20 border border-cyan-900/50 hover:bg-cyan-900/40 hover:border-cyan-400 px-3 py-1.5 rounded transition-all">
                        <Code size={14}/> SOURCE
                      </a>
                    </div>
                    
                    <p className="text-sm text-gray-400 flex-grow mb-6 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-gray-900 text-cyan-500 border border-cyan-900/50 rounded group-hover:border-cyan-500/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}