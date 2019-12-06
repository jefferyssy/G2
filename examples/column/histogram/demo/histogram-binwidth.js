import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet();
    const dv = ds.createView('diamond').source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 4, // 在此修改矩形的宽度，代表真实数值的大小
      as: ['depth', 'count'],
    });

    const chart = new Chart({
      container: 'container',
      height: 500,
    });
    chart.data(dv.rows);

    chart.scale({
      depth: {
        tickInterval: 4,
      },
    });

    chart.tooltip({
      position: 'top',
    });

    chart.interval().position('depth*count');
    chart.render();
  });
