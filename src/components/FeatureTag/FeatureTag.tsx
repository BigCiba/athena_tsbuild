import classNames from "classnames";
import { For, mergeProps, ParentComponent, splitProps } from "solid-js";

import "./FeatureTag.less";

interface FeatureTagProps extends PanelAttributes {
	tag: string;
}

export const FeatureTag: ParentComponent<FeatureTagProps> = (props) => {
	const merged = mergeProps({}, props, { class: classNames("FeatureTag TooltipContent", props.class) });
	const [local, others] = splitProps(merged, ["tag"]);
	return <Panel {...others}>
		<Label class="FeatureTagTitle" html text={"#feature_" + local.tag} />
		<Image class="FeatureTagLine" />
		<Label class="FeatureTagDesc" html text={GetLocalization("#feature_" + local.tag + "_description")} />
	</Panel>;
};

interface FeatureTagsProps extends PanelAttributes {
	tags: string[];
}

export const FeatureTagList: ParentComponent<FeatureTagsProps> = (props) => {
	const merged = mergeProps({}, props, { class: classNames("FeatureTags", props.class) });
	const [local, others] = splitProps(merged, ["tags"]);
	return <Panel {...others}>
		<For each={local.tags}>{(tag) => <FeatureTag tag={tag} />}</For>
	</Panel>;
};