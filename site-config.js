
fetch("config.json")
  .then(response => {
    if (!response.ok) throw new Error("Config not found");
    return response.json();
  })
  .then(config => {
    document.documentElement.style.setProperty(
      "--primary-color",
      config.primaryColor || "#ff003c"
    );

    document.documentElement.style.setProperty(
      "--secondary-color",
      config.secondaryColor || "#8b00ff"
    );

    document.documentElement.style.setProperty(
      "--background-color",
      config.backgroundColor || "#08050f"
    );

    if (config.title) {
      document.title = config.title;
    }

    const title = document.querySelector("#voidkira-title");
    if (title && config.title) title.textContent = config.title;

    const subtitle = document.querySelector("#voidkira-subtitle");
    if (subtitle && config.subtitle) {
      subtitle.textContent = config.subtitle;
    }

    const page1Text = document.querySelector("#page1-text");
    if (page1Text && config.page1Text) {
      page1Text.textContent = config.page1Text;
    }

    const page2Text = document.querySelector("#page2-text");
    if (page2Text && config.page2Text) {
      page2Text.textContent = config.page2Text;
    }

    document.querySelectorAll("[data-config-link]").forEach(link => {
      const key = link.dataset.configLink;
      const url = config[key];

      if (url) {
        try {
          const parsed = new URL(url);
          if (parsed.protocol === "https:") link.href = parsed.href;
        } catch {}
      }
    });

    const logo = document.querySelector("#voidkira-logo");
    if (logo && config.logoImage) {
      try {
        const url = new URL(config.logoImage);
        if (url.protocol === "https:") logo.src = url.href;
      } catch {}
    }

    const video = document.querySelector("#voidkira-video");
    if (video && config.videoUrl) {
      try {
        const url = new URL(config.videoUrl);
        if (url.protocol === "https:") {
          video.src = url.href;
          video.load();
        }
      } catch {}
    }
  })
  .catch(error => console.error("VOIDKIRA config:", error));
