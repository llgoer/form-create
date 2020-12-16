import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fcTree';

export default {
    name: NAME,
    formCreateParser: {
        mergeProp() {
            const props = this.prop.props;
            if (!props.nodeKey) props.nodeKey = 'id';
            if (!props.props) props.props = {
                label: 'title'
            };
        }
    },
    props: {
        formCreateRule: {
            type: Object,
            default: () => ({props: {}})
        },
        type: {
            type: String,
            default: 'checked'
        },
        value: {
            type: [Array, String, Number],
            default: () => ([])
        }
    },
    watch: {
        value() {
            this.setValue();
        }
    },
    methods: {
        onChange() {
            this.updateValue()
        },
        updateValue() {
            const type = this.type.toLocaleLowerCase();
            let value;

            if (type === 'selected') {
                value = this.$refs.tree.getCurrentKey();
            } else {
                value = this.$refs.tree.getCheckedKeys();
            }

            this.$emit('input', value);
        },
        setValue() {
            const type = this.type.toLocaleLowerCase();

            if (type === 'selected') {
                this.$refs.tree.setCurrentKey(this.value);
            }
            else {
                this.$refs.tree.setCheckedKeys(toArray(this.value));
            }
        }
    },
    render() {
        return <ElTree {...this.formCreateRule} ref="tree" on-check-change={() => this.updateValue()}
            on-node-click={() => this.updateValue()}>{this.$slots.default}</ElTree>;
    },
    mounted() {
        this.setValue();
        this.updateValue();
    }
}
