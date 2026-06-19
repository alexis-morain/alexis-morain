<!-- Profile README — alexis-morain. The CAP_PRS block is auto-updated daily, do not remove its markers. -->

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,6,11,20&height=200&section=header&text=Hi,%20I'm%20Alexis%20👋&fontSize=52&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Builder%20·%20Indie%20hacker%20·%20Self-host%20enthusiast&descAlignY=58&descSize=18" width="100%" alt="header"/>

<a href="https://github.com/alexis-morain">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=800&color=7AA2F7&center=true&vCenter=true&width=620&lines=I+ship+side+projects+and+contribute+to+OSS;I+self-host+pretty+much+everything+I+can;Python+%2B+TypeScript+%2B+Docker+%2B+a+lot+of+YAML;Automating+the+boring+parts+with+n8n" alt="typing tagline"/>
</a>

<p>
  <a href="https://www.malt.fr/profile/alexismorain">
    <img alt="Malt" src="https://img.shields.io/badge/Hire_me_on-Malt-FC5757?style=for-the-badge&logo=malt&logoColor=white">
  </a>
  <a href="https://www.linkedin.com/in/alexis-morain/">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>
  <a href="mailto:alexis@morain.fr">
    <img alt="Email" src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white">
  </a>
  <img src="https://komarev.com/ghpvc/?username=alexis-morain&style=for-the-badge&color=7AA2F7&label=Profile+views" alt="Profile views">
</p>

</div>

---

## 👋 About me

```yaml
name:        Alexis Morain
role:        Builder, indie hacker, freelance growth + automation
location:    France 🇫🇷
focus:       shipping small useful products, self-hosting, automating workflows
currently:   running a full homelab media stack and a self-hosted CRM
open_to:     freelance missions (Malt) and interesting collaborations
```

I like building things end to end: a Python bot, a React app, an n8n workflow, a Docker stack behind Traefik. I run my own infrastructure on a VPS and a home NAS, and I contribute the fixes I need back to the open source tools I use.

---

## 🚀 What I'm building

| Project | Stack | What it does |
|---|---|---|
| **[saasradar](https://github.com/alexis-morain/saasradar)** | TypeScript | Curated directory of SaaS tools, independently reviewed |
| **[secret-santa](https://github.com/alexis-morain/secret-santa)** | React · Vite | Festive Secret Santa web app, no signup, shareable links 🎅 |

A few more I keep private for now: a Polymarket quant bot betting on Paris daily max temperature, a dual-momentum (GEM Antonacci) rebalancer for Trading 212, and my personal site built with Astro.

---

## 🏠 Self-hosted homelab

I run a full self-hosted stack across an OVH VPS and a home NAS (UGREEN + ZFS mirror), wired together with Docker, Traefik and Coolify.

**Family media server** — request to stream, fully automated. A relative asks for a movie, it gets found, downloaded behind a VPN kill-switch, hardlinked into the library and subtitled, all on its own.

```mermaid
flowchart LR
    JS["Jellyseerr<br/>family requests"] --> ARR["Radarr + Sonarr<br/>pick 1080p"]
    PRO["Prowlarr<br/>indexers"] --> ARR
    ARR --> TR["Transmission<br/>(VPN kill-switch)"]
    TR --> LIB["Library<br/>hardlinked"]
    BAZ["Bazarr<br/>FR/EN subtitles"] --> LIB
    LIB --> JF["Jellyfin<br/>family streams"]
```

<p>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white">
  <img alt="Traefik" src="https://img.shields.io/badge/Traefik-24A1C1?style=flat&logo=traefikproxy&logoColor=white">
  <img alt="Coolify" src="https://img.shields.io/badge/Coolify-8B5CF6?style=flat&logo=coolify&logoColor=white">
  <img alt="Jellyfin" src="https://img.shields.io/badge/Jellyfin-00A4DC?style=flat&logo=jellyfin&logoColor=white">
  <img alt="Radarr" src="https://img.shields.io/badge/Radarr-FFC230?style=flat&logo=radarr&logoColor=black">
  <img alt="Sonarr" src="https://img.shields.io/badge/Sonarr-2596BE?style=flat&logo=sonarr&logoColor=white">
  <img alt="Prowlarr" src="https://img.shields.io/badge/Prowlarr-E5A00D?style=flat">
  <img alt="ZFS" src="https://img.shields.io/badge/ZFS-blue?style=flat">
  <img alt="WireGuard VPN" src="https://img.shields.io/badge/VPN_kill--switch-88171A?style=flat&logo=wireguard&logoColor=white">
</p>

**Self-hosted CRM + automation** — a [Twenty](https://twenty.com) CRM instance with two n8n pipelines I built around it:

- **Indy → Twenty invoice sync**: pulls invoices from Indy (no public API) into custom CRM objects, dedup by number, status tracking.
- **data.gouv enrichment**: on every new contact, auto-enriches the company from the official SIRENE registry (SIREN, headcount, NAF code) and geocodes the address via the BAN API.

<p>
  <img alt="n8n" src="https://img.shields.io/badge/n8n-EA4B71?style=flat&logo=n8n&logoColor=white">
  <img alt="Twenty CRM" src="https://img.shields.io/badge/Twenty_CRM-1A1A1A?style=flat">
  <img alt="GraphQL" src="https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white">
  <img alt="Cloudflare" src="https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white">
</p>

---

## 🌱 Open source contributions

I run [**Cap**](https://cap.so) (open-source Loom alternative) self-hosted and push the fixes and features I need back upstream.

<!-- CAP_PRS:START -->
<!-- This section is auto-updated daily by .github/workflows/update-readme.yml -->

**[CapSoftware/Cap](https://github.com/CapSoftware/Cap)** — recent contributions:

- 🔵 **[#1907](https://github.com/CapSoftware/Cap/pull/1907)** — feat(share): configurable call-to-action button on shared videos · *open*
- 🔵 **[#1900](https://github.com/CapSoftware/Cap/pull/1900)** — feat(emails): pluggable email provider (Resend + SMTP) · *open*
- ⚪ **[#1890](https://github.com/CapSoftware/Cap/pull/1890)** — feat(folders): public sharing of a folder via a signed link · *closed*
- ✅ **[#1888](https://github.com/CapSoftware/Cap/pull/1888)** — fix(dashboard): bypass Rive in folder create/subfolder dialogs · *merged*
- ✅ **[#1889](https://github.com/CapSoftware/Cap/pull/1889)** — feat(dashboard): allow starting a new recording from inside a folder · *merged*

<!-- CAP_PRS:END -->

I also self-host and tweak forks of [decluttarr](https://github.com/alexis-morain/decluttarr) (download queue cleaner for the *arr stack) and [octo-fiesta](https://github.com/alexis-morain/octo-fiesta) (multi-source Subsonic proxy).

---

## 🧰 Stack I work with

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,ts,js,nodejs,react,astro,docker,nginx,linux,bash,postgres,cloudflare,vercel,githubactions&perline=14" alt="stack"/>
</p>

---

## 📊 GitHub stats

<div align="center">

<img height="165" src="https://github-readme-stats.vercel.app/api?username=alexis-morain&show_icons=true&theme=tokyonight&hide_border=true">
<img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=alexis-morain&layout=compact&theme=tokyonight&hide_border=true&langs_count=8&count_private=true">

<img src="https://streak-stats.demolab.com?user=alexis-morain&theme=tokyonight&hide_border=true" alt="streak">

<img width="92%" src="https://github-readme-activity-graph.vercel.app/graph?username=alexis-morain&theme=tokyo-night&hide_border=true&area=true&custom_title=Contribution%20activity" alt="activity graph">

</div>

---

<div align="center">

### 💬 Let's talk

I'm available for freelance missions on **[Malt](https://www.malt.fr/profile/alexismorain)** and open to interesting collaborations.

Drop me a line: **[alexis@morain.fr](mailto:alexis@morain.fr)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,6,11,20&height=120&section=footer" width="100%" alt="footer"/>

</div>
