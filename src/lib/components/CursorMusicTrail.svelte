<script lang="ts">
  import { onMount } from "svelte";

  type TrailPoint = {
    x: number;
    y: number;
    life: number;
  };

  type TrailNote = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    rotation: number;
    vRot: number;
    glyph: string;
    color: string;
  };

  const NOTE_GLYPHS = ["♪", "♫", "♩", "♬"];
  const TRAIL_COLORS = [
    "#8cbcf8", // soft sky blue
    "#f3d56f", // buttercup yellow
    "#9fd8ec", // misty cerulean
    "#c4b7f7", // soft lavender
  ];

  let canvasEl: HTMLCanvasElement | undefined = $state();

  onMount(() => {
    if (!canvasEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvasEl) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let targetX = width * 0.5;
    let targetY = height * 0.5;
    let flyerX = targetX;
    let flyerY = targetY;
    let hasPointer = false;
    let lastMoveTime = 0;
    let distAccum = 0;

    const points: TrailPoint[] = [];
    const notes: TrailNote[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!hasPointer) {
        flyerX = e.clientX;
        flyerY = e.clientY;
        hasPointer = true;
      }
      targetX = e.clientX;
      targetY = e.clientY;
      lastMoveTime = performance.now();
    };

    const handlePointerLeave = () => {
      hasPointer = false;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("resize", resize);

    let rafId = 0;
    let prevTime = performance.now();

    const drawRibbon = (
      pts: TrailPoint[],
      offsetPx: number,
      wavePhase: number,
      strokeColor: string,
      baseWidth: number,
    ) => {
      if (pts.length < 2) return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const wave0 = Math.sin((i - 1) * 0.45 + wavePhase) * 2.5 + offsetPx;
        const wave1 = Math.sin(i * 0.45 + wavePhase) * 2.5 + offsetPx;

        const alpha = Math.min(p0.life, p1.life) * 0.72;
        if (alpha <= 0.01) continue;

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(0.8, baseWidth * p1.life);
        ctx.beginPath();
        ctx.moveTo(p0.x + nx * wave0, p0.y + ny * wave0);
        ctx.lineTo(p1.x + nx * wave1, p1.y + ny * wave1);
        ctx.stroke();
      }
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prevTime) / 1000);
      prevTime = now;

      ctx.clearRect(0, 0, width, height);

      if (hasPointer) {
        const prevX = flyerX;
        const prevY = flyerY;

        // Smooth dreamy flight follow + subtle hover bob
        const hoverY = Math.sin(now * 0.005) * 2.2;
        flyerX += (targetX - flyerX) * 0.24;
        flyerY += (targetY + hoverY - flyerY) * 0.24;

        const stepDist = Math.hypot(flyerX - prevX, flyerY - prevY);
        if (stepDist > 1.2) {
          points.push({ x: flyerX, y: flyerY, life: 1 });
          if (points.length > 34) points.shift();
          distAccum += stepDist;

          // Emit flying music notes along the trailing lines
          if (distAccum > 32) {
            distAccum = 0;
            notes.push({
              x: flyerX + (Math.random() - 0.5) * 10,
              y: flyerY + (Math.random() - 0.5) * 10,
              vx: (prevX - flyerX) * 0.6 + (Math.random() - 0.5) * 18,
              vy: -18 - Math.random() * 24,
              life: 1,
              maxLife: 0.95 + Math.random() * 0.45,
              size: 13 + Math.random() * 7,
              rotation: (Math.random() - 0.5) * 0.5,
              vRot: (Math.random() - 0.5) * 1.4,
              glyph:
                NOTE_GLYPHS[Math.floor(Math.random() * NOTE_GLYPHS.length)],
              color:
                TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
            });
            if (notes.length > 26) notes.shift();
          }
        }
      }

      // Decay trail points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life -= dt * 1.85;
        if (points[i].life <= 0) {
          points.splice(i, 1);
        }
      }

      const inkColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--neo-ink")
          .trim() || "#1e2749";
      const inkOnPastel =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--neo-ink-on-pastel")
          .trim() || "#1e2749";
      const blueColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--neo-blue")
          .trim() || "#a8cbfa";
      const yellowColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--neo-yellow")
          .trim() || "#fde78b";

      const phase = now * 0.006;

      // Trailing double staff ribbons in pastel blue & butter yellow
      drawRibbon(points, -4, phase, blueColor, 3.2);
      drawRibbon(points, 4, phase + 1.4, yellowColor, 2.8);
      drawRibbon(points, 0, phase + 0.7, inkColor, 1.15);

      // Update and render trailing music notes
      for (let i = notes.length - 1; i >= 0; i--) {
        const n = notes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.vy -= 8 * dt;
        n.rotation += n.vRot * dt;
        n.life -= dt / n.maxLife;

        if (n.life <= 0) {
          notes.splice(i, 1);
          continue;
        }

        const alpha =
          n.life > 0.8 ? (1 - n.life) / 0.2 : Math.max(0, n.life / 0.8);

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.rotation);
        ctx.globalAlpha = alpha * 0.92;
        ctx.font = `700 ${n.size}px "Comfortaa Variable", system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = inkColor;
        ctx.strokeText(n.glyph, 0, 0);
        ctx.fillStyle = n.color;
        ctx.fillText(n.glyph, 0, 0);
        ctx.restore();
      }

      // Draw nimble flying cursor note sparkle while recently moving
      if (hasPointer && now - lastMoveTime < 1400) {
        const idleFade = Math.max(
          0,
          Math.min(1, 1 - (now - lastMoveTime - 900) / 500),
        );
        ctx.save();
        ctx.translate(flyerX + 10, flyerY - 10);
        ctx.globalAlpha = idleFade * 0.9;
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = yellowColor;
        ctx.fill();
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = inkColor;
        ctx.stroke();

        ctx.font = `800 9px "Comfortaa Variable", system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = inkOnPastel;
        ctx.fillText("♪", 0, 0.5);
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  });
</script>

<canvas
  bind:this={canvasEl}
  class="fixed inset-0 pointer-events-none z-40"
  aria-hidden="true"
></canvas>
