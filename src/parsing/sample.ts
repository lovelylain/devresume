export const DEFAULT_TITLE = "简历";
export const SAMPLE_YAML = `\
meta:
  renderOrder:
    - basics
    - education
    - work
    - projects

basics:
  name: 姓名
  label: 求职岗位
  email: youremail@gmail.com
  phone: (+86) 136-8888-8888
  url: www.yourblog.com
  summary:
    熟练掌握全栈开发和敏捷开发方法，具备 10 年以上的软件开发经验。拥有卓越的领导能力和团队管理经验
    ，擅长协调和激励团队以实现共同目标。在多个大型项目中担任核心开发者，成功交付高质量的软件解决方案。
  profiles:
    - network: github
      url: GitHub 地址

work:
  - name: FLAG 公司
    position: 软件程序员
    location: 上海，中国
    url: http://piedpiper.example.com
    summary:
      在 FLAG 科技公司工作期间，我担任软件工程师的角色，负责关键模块的开发和优化。
    startDate: 2013-12
    endDate: 2014-11
    highlights:
      - 设计并实现数据库结构的优化方案，将查询时间减少50%，显著改善系统的响应速度。
      - 根据业务场景扩展了线性规划求解器的核心组件，成功将复杂物流规划业务落地。
      - 参与团队的性能优化工作，使用[技术]将系统的响应时间从5秒降低到2秒，提升了用户的体验。

projects:
  - name: Pied Piper 音频压缩算法
    description: 一种全新的音频压缩算法，能够提供高效且无损的音频压缩解决方案，压缩率达{xx}%。
    startDate: 2016-08
    endDate: 2018-08
    url: missdirection.example.com
    highlights:
      - 要点 1
      - 要点 2
      - 要点 3

education:
  - institution: 燕京大学
    url: https://www.ou.edu/
    area: 计算机技术 学士
    # score: 'Score: 4.0'
    startDate: 2014-06
    # endDate: 2014-06
    courses:
      # - DB1101 - Basic SQL
      # - CS2011 - Java Introduction

awards:
  - title: 与工作有关的证书
    date: 2014-11
    awarder: 颁发者
    summary: 证书效果描述
  - title: 你的博客
    # date: 2014-11
    awarder: 博客专注于讨论的领域
    summary: 访问量等数据。

skills:
  - name: 编程语言
    keywords: ["Java", "Python", "JavaScript"]
  - name: 数据库
    keywords: ["MySQL", "MongoDB"]
  - name: 网络通信
    keywords: ["HTTP", "RPC"]

volunteer:
  - organization: CoderDojo
    position: Teacher
    url: http://coderdojo.example.com/
    startDate: 2012-01
    endDate: 2013-01
    highlights:
      - Awarded 'Teacher of the Month'

# publications:
#   - name: Video compression for 3d media
#     publisher: Hooli
#     releaseDate: 2014-10
#     url: http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)
#     summary:
#       Innovative middle-out compression algorithm that changes
#       the way we store data.
`
