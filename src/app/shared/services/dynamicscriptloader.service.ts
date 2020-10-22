import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
  location: string;
}

export const ScriptStore: Scripts[] = [
  // dashboard
  { name: 'apexCharts', src: 'assets/vendors/js/charts/apexcharts.min.js', location: 'vendor-scripts' },
  { name: 'dragula', src: 'assets/vendors/js/extensions/dragula.min.js', location: 'vendor-scripts' },
  { name: 'dashboardAnalytics', src: 'assets/js/scripts/pages/dashboard-analytics.js', location: 'page-scripts' },
  { name: 'select2', src: 'assets/vendors/js/forms/select/select2.full.min.js', location: 'vendor-scripts' },

  // { name: 'livicons-tools', src: 'assets/fonts/LivIconsEvo/js/LivIconsEvo.tools.min.js', location: 'vendor-scripts' },
  // { name: 'livicons-defaults', src: 'assets/fonts/LivIconsEvo/js/LivIconsEvo.defaults.min.js', location: 'vendor-scripts' },
  // { name: 'livicons', src: 'assets/fonts/LivIconsEvo/js/LivIconsEvo.min.js', location: 'vendor-scripts' },

  // { name: 'vertical-menu-light', src: 'assets/js/scripts/configs/vertical-menu-light.min.js', location: 'vendor-scripts' },
  // { name: 'app-menu', src: 'assets/js/core/app-menu.min.js', location: 'vendor-scripts' },
  // { name: 'app', src: 'assets/js/core/app.min.js', location: 'vendor-scripts' },
]

declare var document: any;

@Injectable({ providedIn: 'root' })
export class DynamicScriptLoaderService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
        location: script.location,
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementById(this.scripts[name].location).appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}