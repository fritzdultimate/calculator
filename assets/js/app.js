Vue.component('calculator', {
    inheritAttrs: false,
    data() {
        return {
            
             
            
        }
    },

    template: 
        `
        <div :class="classname" v-if="typeof value === 'number'" @click="number"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'equals'" @click="equals"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'sub'" @click="sub"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'add'" @click="add"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'negate'" @click="negate"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'dot'" @click="dot"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'times'" @click="times"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'clear'" @click="clear"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'percent'" @click="percent"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else-if="event == 'divide'" @click="divide"  v-bind="$attrs">
           {{value}}
        </div>
        <div :class="classname" v-else  v-bind="$attrs">
           {{result || 0}}
        </div>
        `,

    props: {
        classname: {
            type: String,
            required: true
        },
        event: {
            type: String,
        },

        value: {},
        result: {}
    },

      methods: {
          number(event){
              if(this.$root.operatorClicked) {
                  this.$root.current = '';
                  this.$root.operatorClicked = false;
              }

              let num = event.target.innerHTML.trim();
              if(this.$root.current == "" && num == "0"){
                  return;
              }
              this.$root.current = `${this.$root.current}${num}`;
          },
          resolver(){
              this.$root.operatorClicked = true;
              this.$root.previous = this.$root.current;
          },
          equals(){
              
              if(this.$root.operatorClicked) {
                  return false;
              }
              if(this.$root.previous) {
                  this.$root.current = this.$root.solver(parseFloat(this.$root.current), parseFloat(this.$root.previous));
                  this.$root.previous = null;
              }
          },
          sub: function() {
            if(this.$root.previous) {
                this.$root.current = this.$root.solver(parseFloat(this.$root.current), parseFloat(this.$root.previous));
                this.$root.previous = null;
            }
            this.$root.solver = (a, b) => a - b;
            this.resolver()
          },
          add(){
              if(this.$root.previous) {
                  this.$root.current = this.$root.solver(parseFloat(this.$root.current), parseFloat(this.$root.previous));
                  this.$root.previous = null;
              }
              this.$root.solver = (a, b) => a + b;
              this.resolver()
          },
          negate: function() {
            console.log(this.$root.current)
            this.$root.current = `${this.$root.current}`.charAt(0) === "-" ? `${this.$root.current}`.slice(1) : `-${this.$root.current}`;
          },
          clear: function() {
              this.$root.current = '';
              this.$root.previous = null;
              this.$root.solver = null,
              this.$root.operatorClicked = false;
          },
          dot: function() {
              if(this.$root.current == "")
                this.$root.current = `0.`;
            this.$root.current = `${this.$root.current}`.indexOf(".") === -1 ? `${this.$root.current}.` : this.$root.current;
          },
          times: function() {
            if(this.$root.previous) {
                this.$root.current = this.$root.solver(parseFloat(this.$root.current), parseFloat(this.$root.previous));
                this.$root.previous = null;
            }
            this.$root.solver = (a, b) => a * b;
            this.resolver()
          },
          divide: function() {
            if(this.$root.previous) {
                this.$root.current = this.$root.solver(parseFloat(this.$root.current), parseFloat(this.$root.previous));
                this.$root.previous = null;
            }
            this.$root.solver = (a, b) => a / b;
            this.resolver()
          },
          percent: function() {
            this.$root.current = `${parseFloat(this.$root.current)/100}`
          }
      }, 

      computed: {
          
      },
     
})

new Vue({
    el: '#simple-calculator',
    data: {
        current: "",
        operatorClicked: false,
        solver: null,
        previous: null,
        metaTitle: "Simple calculator with vue",
        nodes: [
            {
                value: "0",
                className: 'display'
            },
            {
                value: "C",
                event: 'clear',
                className: 'btn'
            },
            {
                value: "+/-",
                event: 'negate',
                className: 'btn'
            },
            {
                value: "%",
                event: 'percent',
                className: 'btn'
            },
            {
                value: "/",
                event: 'divide',
                className: 'btn operator'
            },
            {
                value: 7,
                event: 'number',
                className: 'btn'
            },
            {
                value: 8,
                event: 'number',
                className: 'btn'
            },
            {
                value: 9,
                event: 'number',
                className: 'btn'
            },
            {
                value: "X",
                event: 'times',
                className: 'btn operator'
            },
            {
                value: 4,
                event: 'number',
                className: 'btn'
            },
            {
                value: 5,
                event: 'number',
                className: 'btn'
            },
            {
                value: 6,
                event: 'number',
                className: 'btn'
            },
            {
                value: "-",
                event: 'sub',
                className: 'btn operator'
            },
            {
                value: 1,
                event: 'number',
                className: 'btn'
            },
            {
                value: 2,
                event: 'number',
                className: 'btn'
            },
            {
                value: 3,
                event: 'number',
                className: 'btn'
            },
            {
                value: "+",
                event: 'add',
                className: 'btn operator'
            },
            {
                value: 0,
                event: 'number',
                className: 'zero btn'
            },
            {
                value: ".",
                event: 'dot',
                className: 'btn'
            },
            {
                value: "=",
                event: 'equals',
                className: 'btn operator'
            },
            
        ]
        
    },

    methods: {
        // clear: function() {
        //     console.log(9)
        // }
    }
    
})