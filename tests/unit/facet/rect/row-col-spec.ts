import { Chart } from '../../../../src';
import DIAMOND from '../../../../examples/data/diamond.json';
import { RectCfg } from '../../../../src/facet/interface';
import { createDiv } from '../../../util/dom';

describe('facet rect', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: [48, 48, 48, 72],
  });

  chart.data(DIAMOND);

  chart.scale({
    carat: {
      sync: true,
    },
    price: {
      sync: true,
      tickCount: 3,
    },
    cut: {
      sync: true,
    }
  });

  chart.legend('price', {
    position: 'top',
  });

  // 使用分面
  chart.facet('rect', {
    fields: [ 'clarity', 'cut' ],
    columnTitle: {
      offsetY: -16,
      style: {
        fontSize: 12,
      }
    },
    eachView(view, f) {
      view.point()
        .position('carat*price')
        .color('cut')
        .shape('circle')
        .style({
          opacity: 0.8
        })
        .size('price');
    },
    padding: 12,
  });

  chart.render();

  // @ts-ignore
  const facet = chart.facetInstance;

  it('rect instance', () => {
    // facet view padding
    // @ts-ignore
    const cfg = facet.cfg as RectCfg;

    expect(cfg.type).toBe('rect');
    expect(cfg.padding).toBe(12);
    expect(cfg.showTitle).toBe(true);
    expect(cfg.rowTitle.offsetX).toBe(8);
    expect(cfg.columnTitle.offsetY).toBe(-16);

    // @ts-ignore
    expect(cfg.columnTitle.style.fontSize).toBe(12);
    // @ts-ignore
    expect(cfg.columnTitle.style.textAlign).toBe('center');
  });

  it('use filter data', () => {
    // facet view padding
    // @ts-ignore
    expect(chart.facetInstance.cfg.type).toBe('rect');
    // @ts-ignore
    expect(chart.facetInstance.cfg.padding).toBe(12);
  });

  it('rect facet view', () => {
    // facet views
    expect(chart.views.length).toBe(40);
    // @ts-ignore
    expect(chart.views[0].padding).toEqual(12);
    // @ts-ignore
    expect(chart.views[0].region).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 1 / 8, y: 1 / 5 },
    });

    expect(chart.views[0].getOptions().axes).toEqual({
      carat: {
        label: null,
        title: null,
      },
      price: {
        title: null,
      }
    });
  });
});