document.getElementById("y").textContent = new Date().getFullYear();

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Animations only when the user has not asked for reduced motion.
  // Under reduced motion nothing is hidden — the page just rests.
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // 1) Hero enters once on load: text + circuit drawing itself.
    const wires = gsap.utils.toArray(".circuit .wire");
    wires.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-hero]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 })
      .to(wires, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: "power2.inOut" }, 0.2)
      .from(".circuit .node", { scale: 0, transformOrigin: "50% 50%", duration: 0.4, stagger: 0.06, ease: "back.out(2)" }, 1)
      .from(".circuit .bolt", { scale: 0.6, opacity: 0, transformOrigin: "50% 50%", duration: 0.6, ease: "back.out(1.8)" }, 1.1);

    // 2) Process line charges up as you scroll through the steps.
    const vertical = window.matchMedia("(max-width: 860px)").matches;
    gsap.fromTo(".steps__fill",
      vertical ? { scaleY: 0 } : { scaleX: 0 },
      {
        ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
        ease: "none",
        scrollTrigger: { trigger: ".steps-wrap", start: "top 75%", end: "bottom 55%", scrub: true }
      }
    );
  });
}
