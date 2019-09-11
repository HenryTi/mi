import * as React from 'react';
import { nav } from 'tonva';
import { PageItems, Controller } from 'tonva';
import { CStockInfo } from '../stockinfo/CStockInfo';
import { VSiteHeader } from './VSiteHeader';
//import { CMiApp } from '../CMiApp';
import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';
import { CUqBase } from 'CUqBase';

class HomePageItems<T> extends PageItems<T> {
    cHome: CHome;
    constructor(cHome: CHome) {
        super(true);
        this.cHome = cHome;
        this.pageSize = 30;
        this.firstSize = 30;
    }
    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        let query = {
            name:'pe',
            pageStart:pageStart,
            pageSize:pageSize,
            user:this.cHome.user.id,
            yearlen: 1,
        };
        let result = await this.cHome.cApp.miApi.process(query, []);
        if (Array.isArray(result) === false) return [];
        return result as any[];
    }
    protected setPageStart(item: any) {
        this.pageStart = item === undefined ? 0 : item.order;
    }
}

export class CHome extends CUqBase {
    PageItems: PageItems<any> = new HomePageItems<any>(this);

    //cApp: CMiApp;

    //vHome: VHome;

    /*
    constructor(cApp: CMiApp, res: any) {
        super(res);

        this.buildPageItems();
        this.cApp = cApp;
        this.vHome = new VHome(this);
    }
    */
    /*
    protected buildPageItems(): PageItems<any> {
        return this.PageItems = new HomePageItems<any>(this);
    }
    */

    onPage = () => {
        this.PageItems.more();
    }

    async searchMain(key: string) {
        /*
        if (this.PageItems === undefined) {
            this.PageItems = this.buildPageItems();
        }*/
        if (key !== undefined) await this.PageItems.first(key);
    }

    async internalStart(param: any) {
        //this.openVPage(VHome);
    }

    renderSiteHeader = () => {
        return this.renderView(VSiteHeader);
    }

    renderSearchHeader = (size?: string) => {
        return this.renderView(VSearchHeader, size);
    }

    
    renderHome = () => {
        //return this.vHome.render(undefined);
        return this.renderView(VHome);
    }
    

    openMetaView = () => {
    }

    tab = () => <this.renderHome />;

    openStockInfo = (item:any) => {
        let cStockInfo = this.newC(CStockInfo); // new CStockInfo(this.cApp, undefined);
        cStockInfo.start(item);
    }
}