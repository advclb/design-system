import React, { ReactElement, Component, Children, createRef } from "react";
import cn from "classnames";

export interface SlidesProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactElement[];
  activeIndex?: number;
  onActiveIndexChanged?: (index: number) => void;
  align?: "left" | "right" | "center";
}

interface SlidesState {
  activeIndex: number;
}

export class Slides extends Component<SlidesProps, SlidesState> {
  scrollEndTimeout?: number = undefined;
  root = createRef<HTMLDivElement>();

  state: SlidesState = {
    activeIndex: 0,
  };

  componentDidMount(): void {
    if (typeof this.props.activeIndex === "number") {
      this.scrollToIndex(this.props.activeIndex);
    }
  }

  componentDidUpdate(): void {
    if (typeof this.props.activeIndex === "number") {
      this.scrollToIndex(this.props.activeIndex);
    }
  }

  scrollToIndex(index: number): void {
    const root = this.root.current;
    const items = root?.children;
    if (!root || !items?.length) {
      return;
    }
    const item = items.item(index) as HTMLElement;
    if (item) {
      item.scrollIntoView({ block: "nearest", inline: "start" });
    }
  }

  getActiveIndex(): number {
    const root = this.root.current;
    const items = root?.children;
    if (!root || !items?.length) {
      return 0;
    }
    let distance = 0;
    for (let i = 0; i < items.length; i++) {
      if (root.scrollLeft <= distance) {
        return i;
      }
      const item = items.item(i) as HTMLElement;
      distance += item.clientWidth;
    }
    return items.length - 1;
  }

  handleScroll = (): void => {
    window.clearTimeout(this.scrollEndTimeout);
    this.scrollEndTimeout = window.setTimeout(() => {
      const index = this.getActiveIndex();
      if (this.props.onActiveIndexChanged) {
        if (this.props.activeIndex !== index) {
          this.props.onActiveIndexChanged(index);
        }
      } else {
        this.setState({ activeIndex: index });
      }
    }, 100);
  };

  render(): ReactElement {
    const { children, className, ...rest } = this.props;
    return (
      <div
        ref={this.root}
        className={cn("ac-slides", className)}
        {...rest}
        onScroll={this.handleScroll}
      >
        {Children.map(children, (child, index) => (
          <div key={index} className="ac-slides__item">
            {child}
          </div>
        ))}
      </div>
    );
  }
}