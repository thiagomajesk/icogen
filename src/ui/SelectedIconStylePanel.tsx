import {
  Accordion,
  ActionIcon,
  Button,
  Checkbox,
  type ComboboxItem,
  ColorInput,
  Divider,
  Group,
  NumberInput,
  ScrollArea,
  type SelectProps,
  Select,
  Slider,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowDown,
  IconArrowDownRight,
  IconArrowRight,
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconCircle,
  IconColorPicker,
  IconFlipHorizontal,
  IconFlipVertical,
  IconGitBranch,
  IconInfoCircle,
  IconRotate2,
  IconRotateClockwise2,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import {
  defaultAnimationClip,
  defaultBackground,
  defaultForeground,
} from "../core/constants";
import {
  ANIMATION_EASING_OPTIONS,
  ANIMATION_PRESET_OPTIONS,
  isDefaultAnimationClipState,
} from "../core/animation-clip";
import {
  isDefaultBackgroundStyle,
  isDefaultForegroundStyle,
} from "../core/style-state";
import type {
  AnimationClipState,
  AnimationPresetValue,
  BackgroundStyleState,
  ForegroundStyleState,
} from "../core/types";
import { STYLE_SHAPE_OPTIONS, StyleShapeIcon } from "./style-shapes";

interface SelectedIconStylePanelProps {
  background: BackgroundStyleState;
  canBreakApartPaths: boolean;
  foreground: ForegroundStyleState;
  foregroundPathOptions: Array<{ id: string; label: string }>;
  onBackgroundChange: (background: BackgroundStyleState) => void;
  onBreakApartPaths: () => void;
  onResetForegroundPart: () => void;
  onResetForegroundAll: () => void;
  onCycleAnimationTarget: (direction: 1 | -1) => void;
  onCycleForegroundPath: (direction: 1 | -1) => void;
  onDeselectIcon: () => void;
  onForegroundChange: (foreground: ForegroundStyleState) => void;
  selectedForegroundPathId: string | null;
  isPathsBrokenApart: boolean;
  animationClip: AnimationClipState;
  onAnimationClipChange: (patch: Partial<AnimationClipState>) => void;
  onResetAnimationPart: () => void;
  onResetAnimationAll: () => void;
}

const backgroundTypeOptions = [
  { value: "flat", label: "Flat" },
  { value: "gradient", label: "Gradient" },
];

const foregroundTypeOptions = [
  { value: "none", label: "None" },
  { value: "flat", label: "Flat" },
  { value: "gradient", label: "Gradient" },
];

const gradientOptions = [
  { value: "radial", label: "Radial" },
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
  { value: "diagonal-forward", label: "Diagonal Forward" },
  { value: "diagonal-backward", label: "Diagonal Backward" },
];

const strokeOptions = [
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

type ShadowModeOptionValue = "none" | BackgroundStyleState["shadowMode"];

const shadowModeOptions: Array<{ value: ShadowModeOptionValue; label: string }> = [
  { value: "none", label: "None" },
  { value: "outer", label: "Outer" },
  { value: "inner", label: "Inner" },
];

const blendModeOptions: Array<{
  value: ForegroundStyleState["blendMode"];
  label: string;
}> = [
  { value: "normal", label: "Normal" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "overlay", label: "Overlay" },
  { value: "soft-light", label: "Soft Light" },
  { value: "color", label: "Color" },
  { value: "luminosity", label: "Luminosity" },
];

type BackgroundShapeControlValue = BackgroundStyleState["shape"] | "none";

const backgroundShapeOptions: Array<{
  value: BackgroundShapeControlValue;
  label: string;
}> = [{ value: "none", label: "None" }, ...STYLE_SHAPE_OPTIONS];

const eyeDropperIcon = <IconColorPicker size={14} stroke={1.8} />;
const ANIMATION_DURATION_MIN_MS = 200;
const ANIMATION_DURATION_MAX_MS = 3000;
const ANIMATION_TOOLTIP_COLOR = "dark.6";

function gradientTypeIcon(gradientType: string) {
  const size = 14;
  const stroke = 1.9;

  if (gradientType === "horizontal") {
    return <IconArrowRight size={size} stroke={stroke} />;
  }

  if (gradientType === "vertical") {
    return <IconArrowDown size={size} stroke={stroke} />;
  }

  if (gradientType === "diagonal-forward") {
    return <IconArrowDownRight size={size} stroke={stroke} />;
  }

  if (gradientType === "diagonal-backward") {
    return <IconArrowUpRight size={size} stroke={stroke} />;
  }

  return <IconCircle size={size} stroke={stroke} />;
}

const renderGradientOption: NonNullable<SelectProps["renderOption"]> = ({
  option,
}) => {
  const item = option as ComboboxItem;
  return (
    <Group gap={8} wrap="nowrap">
      {gradientTypeIcon(item.value)}
      <span>{item.label}</span>
    </Group>
  );
};

function backgroundShapeOptionIcon(shape: BackgroundShapeControlValue) {
  if (shape === "none") {
    return <span style={{ width: 14, height: 14, display: "inline-block" }} />;
  }

  return (
    <span
      style={{
        width: 14,
        height: 14,
        display: "inline-flex",
        color: "var(--mantine-color-dimmed)",
      }}
    >
      <StyleShapeIcon shape={shape} />
    </span>
  );
}

const renderBackgroundShapeOption: NonNullable<SelectProps["renderOption"]> = ({
  option,
}) => {
  const item = option as ComboboxItem;

  return (
    <Group gap={8} wrap="nowrap">
      {backgroundShapeOptionIcon(item.value as BackgroundShapeControlValue)}
      <span>{item.label}</span>
    </Group>
  );
};

function toNumber(value: string | number, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toShadowModeControlValue(
  surface: Pick<BackgroundStyleState, "shadowEnabled" | "shadowMode">,
): ShadowModeOptionValue {
  return surface.shadowEnabled ? (surface.shadowMode ?? "outer") : "none";
}

interface LabeledSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  marks?: Array<{ value: number; label?: string }>;
  restrictToMarks?: boolean;
  onChange: (value: number) => void;
}

function LabeledSlider({
  label,
  value,
  min,
  max,
  step = 1,
  marks,
  restrictToMarks = false,
  onChange,
}: LabeledSliderProps) {
  return (
    <Stack gap={4}>
      <Group justify="space-between" gap="xs">
        <Text size="sm" fw={500}>
          {label}
        </Text>
        <Text size="xs" c="dimmed">
          {value}
        </Text>
      </Group>
      <Slider
        label={null}
        min={min}
        max={max}
        step={step}
        marks={marks}
        restrictToMarks={restrictToMarks}
        value={value}
        onChange={onChange}
      />
    </Stack>
  );
}

function pathCounterLabel(
  selectedForegroundPathId: string | null,
  foregroundPathOptions: Array<{ id: string; label: string }>,
): string {
  if (foregroundPathOptions.length === 0) {
    return "0/0";
  }

  const index = foregroundPathOptions.findIndex(
    (option) => option.id === selectedForegroundPathId,
  );

  return `${Math.max(1, index + 1)}/${foregroundPathOptions.length}`;
}

function animationTargetCounterLabel(
  targetPathId: string | null,
  foregroundPathOptions: Array<{ id: string; label: string }>,
): string {
  const total = foregroundPathOptions.length + 1;
  if (total === 0) {
    return "0/0";
  }

  if (targetPathId === null) {
    return `1/${total}`;
  }

  const index = foregroundPathOptions.findIndex((option) => option.id === targetPathId);
  if (index === -1) {
    return `1/${total}`;
  }

  return `${index + 2}/${total}`;
}

export function SelectedIconStylePanel({
  animationClip,
  background,
  canBreakApartPaths,
  foreground,
  foregroundPathOptions,
  onAnimationClipChange,
  onResetAnimationAll,
  onResetAnimationPart,
  onBackgroundChange,
  onBreakApartPaths,
  onCycleAnimationTarget,
  onResetForegroundAll,
  onResetForegroundPart,
  onCycleForegroundPath,
  onDeselectIcon,
  onForegroundChange,
  selectedForegroundPathId,
  isPathsBrokenApart,
}: SelectedIconStylePanelProps) {
  const isBackgroundDefault = isDefaultBackgroundStyle(background);
  const isForegroundDefault = isDefaultForegroundStyle(foreground);
  const isBackgroundStrokeDisabled = background.strokeStyle === "none";
  const isForegroundStrokeDisabled = foreground.strokeStyle === "none";
  const backgroundShadowModeValue = toShadowModeControlValue(background);
  const foregroundShadowModeValue = toShadowModeControlValue(foreground);
  const backgroundTypeControlValue: Exclude<BackgroundStyleState["type"], "none"> =
    background.type === "none" ? "flat" : background.type;
  const backgroundShapeControlValue: BackgroundShapeControlValue =
    background.type === "none" ? "none" : background.shape;
  const foregroundBlendOpacityPercent = Math.round(
    (foreground.blendOpacity ?? 1) * 100,
  );
  const isAnimationDefault = isDefaultAnimationClipState(animationClip);

  return (
    <Stack h="100%" gap="sm" style={{ minHeight: 0 }}>
      <Group justify="space-between" align="center">
        <Text fw={700}>Editor</Text>
        <ActionIcon
          variant="default"
          aria-label="Back to icon search"
          onClick={onDeselectIcon}
        >
          <IconArrowLeft size={16} />
        </ActionIcon>
      </Group>

      <ScrollArea
        style={{ flex: 1, minHeight: 0 }}
        type="hover"
        scrollbars="y"
      >
        <Accordion
          defaultValue={["background", "foreground"]}
          multiple
          variant="separated"
          radius="md"
          styles={{
            item: {
              backgroundColor: "var(--mantine-color-dark-6)",
              borderColor: "var(--mantine-color-dark-4)",
              overflow: "hidden",
            },
            panel: {
              backgroundColor: "var(--mantine-color-dark-7)",
              paddingTop: "var(--mantine-spacing-xs)",
              paddingBottom: "var(--mantine-spacing-xs)",
            },
          }}
        >
            <Accordion.Item value="background">
              <Accordion.Control>
                <Text fw={600}>Background</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="sm">
                  <Select
                    label="Fill"
                    variant="filled"
                    data={backgroundTypeOptions}
                    value={backgroundTypeControlValue}
                    allowDeselect={false}
                    onChange={(value) => {
                      const nextType = (value ?? "flat") as Exclude<
                        BackgroundStyleState["type"],
                        "none"
                      >;
                      if (background.type === "flat" && nextType === "gradient") {
                        onBackgroundChange({
                          ...background,
                          type: nextType,
                          gradientFrom: background.flatColor,
                        });
                        return;
                      }

                      onBackgroundChange({
                        ...background,
                        type: nextType,
                      });
                    }}
                  />

                  {background.type === "flat" ? (
                    <ColorInput
                      label="Fill Color"
                      variant="filled"
                      format="hexa"
                      eyeDropperIcon={eyeDropperIcon}
                      value={background.flatColor}
                      onChange={(value) =>
                        onBackgroundChange({
                          ...background,
                          flatColor: value,
                        })
                      }
                    />
                  ) : null}

                  {background.type === "gradient" ? (
                    <>
                      <Select
                        label="Gradient"
                        variant="filled"
                        data={gradientOptions}
                        leftSection={gradientTypeIcon(background.gradientType)}
                        renderOption={renderGradientOption}
                        value={background.gradientType}
                        allowDeselect={false}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            gradientType:
                              (value ?? "radial") as BackgroundStyleState["gradientType"],
                          })
                        }
                      />
                      <ColorInput
                        label="From"
                        variant="filled"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={background.gradientFrom}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            gradientFrom: value,
                          })
                        }
                      />
                      <ColorInput
                        label="To"
                        variant="filled"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={background.gradientTo}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            gradientTo: value,
                          })
                        }
                      />
                    </>
                  ) : null}

                  <Divider />
                  <Select
                    label="Stroke"
                    variant="filled"
                    data={strokeOptions}
                    value={background.strokeStyle}
                    allowDeselect={false}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        strokeStyle: (value ?? "none") as BackgroundStyleState["strokeStyle"],
                      })
                    }
                  />

                  <NumberInput
                    label="Stroke Width"
                    variant="filled"
                    min={0}
                    max={64}
                    step={1}
                    disabled={isBackgroundStrokeDisabled}
                    value={background.frameWidth}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameWidth: Math.max(0, toNumber(value, background.frameWidth)),
                      })
                    }
                  />

                  <ColorInput
                    label="Stroke Color"
                    variant="filled"
                    format="hexa"
                    eyeDropperIcon={eyeDropperIcon}
                    disabled={isBackgroundStrokeDisabled}
                    value={background.frameColor}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameColor: value,
                      })
                    }
                  />

                  <Divider />
                  <Select
                    label="Shadow"
                    variant="filled"
                    data={shadowModeOptions}
                    value={backgroundShadowModeValue}
                    allowDeselect={false}
                    onChange={(value) => {
                      const nextValue = (value ?? "none") as ShadowModeOptionValue;
                      onBackgroundChange({
                        ...background,
                        shadowEnabled: nextValue !== "none",
                        shadowMode:
                          nextValue === "none"
                            ? "outer"
                            : (nextValue as BackgroundStyleState["shadowMode"]),
                      });
                    }}
                  />
                  <Stack gap="xs">
                    {backgroundShadowModeValue !== "none" ? (
                      <>
                      <ColorInput
                        label="Shadow Color"
                        variant="filled"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={background.shadowColor ?? "#000000"}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            shadowColor: value,
                          })
                        }
                      />
                      <LabeledSlider
                        label="Shadow Blur"
                        value={background.shadowBlur ?? 0}
                        min={0}
                        max={64}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            shadowBlur: value,
                          })
                        }
                      />
                      <Divider />
                      </>
                    ) : null}
                  <Select
                    label="Shape"
                    variant="filled"
                    data={backgroundShapeOptions}
                    value={backgroundShapeControlValue}
                    leftSection={
                      backgroundShapeControlValue === "none"
                        ? null
                        : backgroundShapeOptionIcon(backgroundShapeControlValue)
                    }
                    renderOption={renderBackgroundShapeOption}
                    allowDeselect={false}
                    onChange={(value) =>
                      value === "none"
                          ? onBackgroundChange({
                              ...background,
                              type: "none",
                            })
                          : onBackgroundChange({
                              ...background,
                              type: background.type === "none" ? "flat" : background.type,
                              shape: (value ?? "circle") as BackgroundStyleState["shape"],
                            })
                      }
                    />
                    {backgroundShadowModeValue !== "none" ? (
                      <>
                      <LabeledSlider
                        label="Offset X"
                        value={background.shadowOffsetX ?? 0}
                        min={-100}
                        max={100}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            shadowOffsetX: value,
                          })
                        }
                      />
                      <LabeledSlider
                        label="Offset Y"
                        value={background.shadowOffsetY ?? 0}
                        min={-100}
                        max={100}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            shadowOffsetY: value,
                          })
                        }
                      />
                      </>
                    ) : null}
                  </Stack>

                  <LabeledSlider
                    label="Rotate"
                    value={background.frameRotate}
                    min={-180}
                    max={180}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameRotate: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Scale"
                    value={background.frameScale}
                    min={1}
                    max={100}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameScale: value,
                      })
                    }
                  />

                  <Button
                    variant="default"
                    fullWidth
                    leftSection={<IconRotate2 size={16} />}
                    disabled={isBackgroundDefault}
                    onClick={() => onBackgroundChange(defaultBackground)}
                  >
                    Reset background
                  </Button>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="foreground">
              <Accordion.Control>
                <Text fw={600}>Foreground</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="sm">
                  <Group gap={6} wrap="nowrap" align="center">
                    <IconInfoCircle
                      size={24}
                      stroke={1.8}
                      color="var(--mantine-color-dimmed)"
                      style={{ flexShrink: 0 }}
                    />
                    <Text size="sm" c="dimmed">
                      Break apart the SVG to customize paths individually
                    </Text>
                  </Group>

                  <Group justify="space-between" align="center">
                    <Text size="sm" fw={500}>
                      Paths
                    </Text>
                    {!isPathsBrokenApart ? (
                      <Button
                        variant="default"
                        size="xs"
                        w={124}
                        leftSection={<IconGitBranch size={14} stroke={1.8} />}
                        disabled={!canBreakApartPaths}
                        onClick={onBreakApartPaths}
                      >
                        Break apart
                      </Button>
                    ) : (
                      <Group gap={6} wrap="nowrap" w={124} justify="space-between">
                        <ActionIcon
                          variant="default"
                          size="sm"
                          aria-label="Previous foreground path"
                          disabled={foregroundPathOptions.length === 0}
                          onClick={() => onCycleForegroundPath(-1)}
                        >
                          <IconChevronLeft size={16} />
                        </ActionIcon>
                        <Text size="sm" c="dimmed" w={52} ta="center">
                          {pathCounterLabel(selectedForegroundPathId, foregroundPathOptions)}
                        </Text>
                        <ActionIcon
                          variant="default"
                          size="sm"
                          aria-label="Next foreground path"
                          disabled={foregroundPathOptions.length === 0}
                          onClick={() => onCycleForegroundPath(1)}
                        >
                          <IconChevronRight size={16} />
                        </ActionIcon>
                      </Group>
                    )}
                  </Group>

                  <Divider />

                  <Select
                    label="Fill"
                    variant="filled"
                    data={foregroundTypeOptions}
                    value={foreground.type}
                    allowDeselect={false}
                    onChange={(value) => {
                      const nextType = (value ?? "none") as ForegroundStyleState["type"];
                      if (foreground.type === "flat" && nextType === "gradient") {
                        onForegroundChange({
                          ...foreground,
                          type: nextType,
                          gradientFrom: foreground.flatColor,
                        });
                        return;
                      }

                      onForegroundChange({
                        ...foreground,
                        type: nextType,
                      });
                    }}
                  />

                  {foreground.type === "flat" ? (
                    <ColorInput
                      label="Fill Color"
                      variant="filled"
                      format="hexa"
                      eyeDropperIcon={eyeDropperIcon}
                      value={foreground.flatColor}
                      onChange={(value) =>
                        onForegroundChange({
                          ...foreground,
                          flatColor: value,
                        })
                      }
                    />
                  ) : null}

                  {foreground.type === "gradient" ? (
                    <>
                      <Select
                        label="Gradient"
                        variant="filled"
                        data={gradientOptions}
                        leftSection={gradientTypeIcon(foreground.gradientType)}
                        renderOption={renderGradientOption}
                        value={foreground.gradientType}
                        allowDeselect={false}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            gradientType:
                              (value ?? "radial") as ForegroundStyleState["gradientType"],
                          })
                        }
                      />
                      <ColorInput
                        label="From"
                        variant="filled"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={foreground.gradientFrom}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            gradientFrom: value,
                          })
                        }
                      />
                      <ColorInput
                        label="To"
                        variant="filled"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={foreground.gradientTo}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            gradientTo: value,
                          })
                        }
                      />
                    </>
                  ) : null}

                  <Divider />
                  <Select
                    label="Stroke"
                    variant="filled"
                    data={strokeOptions}
                    value={foreground.strokeStyle}
                    allowDeselect={false}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        strokeStyle: (value ?? "none") as ForegroundStyleState["strokeStyle"],
                      })
                    }
                  />

                  <NumberInput
                    label="Stroke Width"
                    variant="filled"
                    min={0}
                    max={64}
                    step={1}
                    disabled={isForegroundStrokeDisabled}
                    value={foreground.frameWidth}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        frameWidth: Math.max(0, toNumber(value, foreground.frameWidth)),
                      })
                    }
                  />

                  <ColorInput
                    label="Stroke Color"
                    variant="filled"
                    format="hexa"
                    eyeDropperIcon={eyeDropperIcon}
                    disabled={isForegroundStrokeDisabled}
                    value={foreground.frameColor}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        frameColor: value,
                      })
                    }
                  />

                  <Divider />
                  <Text size="sm" fw={500}>
                    Transform
                  </Text>
                  <Group gap="xs" grow wrap="nowrap">
                    <Tooltip label="Flip horizontally">
                      <ActionIcon
                        variant={foreground.flipX ? "filled" : "default"}
                        size="sm"
                        aria-label="Flip horizontally"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            flipX: !foreground.flipX,
                          })
                        }
                      >
                        <IconFlipHorizontal size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Flip vertically">
                      <ActionIcon
                        variant={foreground.flipY ? "filled" : "default"}
                        size="sm"
                        aria-label="Flip vertically"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            flipY: !foreground.flipY,
                          })
                        }
                      >
                        <IconFlipVertical size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Rotate +15°">
                      <ActionIcon
                        variant="default"
                        size="sm"
                        aria-label="Rotate clockwise 15 degrees"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameRotate: foreground.frameRotate + 15,
                          })
                        }
                      >
                        <IconRotateClockwise2 size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Rotate −15°">
                      <ActionIcon
                        variant="default"
                        size="sm"
                        aria-label="Rotate counter-clockwise 15 degrees"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameRotate: foreground.frameRotate - 15,
                          })
                        }
                      >
                        <IconRotate2 size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Zoom −10%">
                      <ActionIcon
                        variant="default"
                        size="sm"
                        aria-label="Zoom out 10%"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameScale: Math.max(1, foreground.frameScale - 10),
                          })
                        }
                      >
                        <IconZoomOut size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Zoom +10%">
                      <ActionIcon
                        variant="default"
                        size="sm"
                        aria-label="Zoom in 10%"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameScale: Math.min(200, foreground.frameScale + 10),
                          })
                        }
                      >
                        <IconZoomIn size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                  <Divider />

                  <LabeledSlider
                    label="Position X"
                    value={foreground.positionX}
                    min={-100}
                    max={100}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        positionX: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Position Y"
                    value={foreground.positionY}
                    min={-100}
                    max={100}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        positionY: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Skew X"
                    value={foreground.skewX}
                    min={-45}
                    max={45}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        skewX: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Skew Y"
                    value={foreground.skewY}
                    min={-45}
                    max={45}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        skewY: value,
                      })
                    }
                  />

                  <Divider />
                  <Select
                    label="Shadow"
                    variant="filled"
                    data={shadowModeOptions}
                    value={foregroundShadowModeValue}
                    allowDeselect={false}
                    onChange={(value) => {
                      const nextValue = (value ?? "none") as ShadowModeOptionValue;
                      onForegroundChange({
                        ...foreground,
                        shadowEnabled: nextValue !== "none",
                        shadowMode:
                          nextValue === "none"
                            ? "outer"
                            : (nextValue as ForegroundStyleState["shadowMode"]),
                      });
                    }}
                  />
                  {foregroundShadowModeValue !== "none" ? (
                    <Stack gap="xs">
                      <ColorInput
                        label="Shadow Color"
                        variant="filled"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={foreground.shadowColor ?? "#000000"}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            shadowColor: value,
                          })
                        }
                      />
                      <LabeledSlider
                        label="Shadow Blur"
                        value={foreground.shadowBlur ?? 0}
                        min={0}
                        max={64}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            shadowBlur: value,
                          })
                        }
                      />
                      <Divider />
                      <LabeledSlider
                        label="Offset X"
                        value={foreground.shadowOffsetX ?? 0}
                        min={-100}
                        max={100}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            shadowOffsetX: value,
                          })
                        }
                      />
                      <LabeledSlider
                        label="Offset Y"
                        value={foreground.shadowOffsetY ?? 0}
                        min={-100}
                        max={100}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            shadowOffsetY: value,
                          })
                        }
                      />
                    </Stack>
                  ) : null}

                  <Divider />
                  <Select
                    label="Blend Mode"
                    variant="filled"
                    data={blendModeOptions}
                    value={foreground.blendMode ?? "normal"}
                    allowDeselect={false}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        blendMode:
                          (value ?? "normal") as ForegroundStyleState["blendMode"],
                      })
                    }
                  />
                  <LabeledSlider
                    label="Opacity"
                    value={foregroundBlendOpacityPercent}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        blendOpacity: value / 100,
                      })
                    }
                  />

                  <Checkbox
                    checked={foreground.clipToBackground}
                    onChange={(event) =>
                      onForegroundChange({
                        ...foreground,
                        clipToBackground: event.currentTarget.checked,
                      })
                    }
                    label="Clip to background shape"
                  />

                  {isPathsBrokenApart ? (
                    <Group grow>
                      <Button
                        variant="default"
                        leftSection={<IconRotate2 size={16} />}
                        disabled={isForegroundDefault}
                        onClick={onResetForegroundPart}
                      >
                        Reset part
                      </Button>
                      <Button
                        variant="default"
                        leftSection={<IconRotate2 size={16} />}
                        onClick={onResetForegroundAll}
                      >
                        Reset all
                      </Button>
                    </Group>
                  ) : (
                    <Button
                      variant="default"
                      fullWidth
                      leftSection={<IconRotate2 size={16} />}
                      disabled={isForegroundDefault}
                      onClick={() => onForegroundChange(defaultForeground)}
                    >
                      Reset foreground
                    </Button>
                  )}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="animation">
              <Accordion.Control>
                <Text fw={600}>Animation</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="sm">
                  <Group justify="space-between" align="center">
                    <Text size="sm" fw={500}>
                      Target
                    </Text>
                    {isPathsBrokenApart ? (
                      <Group gap={6} wrap="nowrap" w={124} justify="space-between">
                        <ActionIcon
                          variant="default"
                          size="sm"
                          aria-label="Previous animation target"
                          onClick={() => onCycleAnimationTarget(-1)}
                        >
                          <IconChevronLeft size={16} />
                        </ActionIcon>
                        <Text size="sm" c="dimmed" w={52} ta="center">
                          {animationTargetCounterLabel(
                            animationClip.targetPathId,
                            foregroundPathOptions,
                          )}
                        </Text>
                        <ActionIcon
                          variant="default"
                          size="sm"
                          aria-label="Next animation target"
                          onClick={() => onCycleAnimationTarget(1)}
                        >
                          <IconChevronRight size={16} />
                        </ActionIcon>
                      </Group>
                    ) : (
                      <Text size="sm" c="dimmed">
                        Foreground
                      </Text>
                    )}
                  </Group>
                  <Select
                    label="Preset"
                    variant="filled"
                    data={ANIMATION_PRESET_OPTIONS}
                    value={animationClip.preset}
                    allowDeselect={false}
                    onChange={(value) =>
                      onAnimationClipChange({
                        preset: (value ?? "none") as AnimationPresetValue,
                      })
                    }
                  />
                  <LabeledSlider
                    label="Duration (ms)"
                    min={ANIMATION_DURATION_MIN_MS}
                    max={ANIMATION_DURATION_MAX_MS}
                    value={Math.min(
                      ANIMATION_DURATION_MAX_MS,
                      Math.max(ANIMATION_DURATION_MIN_MS, animationClip.durationMs),
                    )}
                    onChange={(value) =>
                      onAnimationClipChange({
                        durationMs: Math.min(
                          ANIMATION_DURATION_MAX_MS,
                          Math.max(ANIMATION_DURATION_MIN_MS, value),
                        ),
                      })
                    }
                  />

                  <Select
                    label="Easing"
                    variant="filled"
                    data={ANIMATION_EASING_OPTIONS}
                    value={animationClip.ease}
                    allowDeselect={false}
                    onChange={(value) =>
                      onAnimationClipChange({
                        ease: value ?? animationClip.ease,
                      })
                    }
                  />

                  <Group grow>
                    <Tooltip
                      label="Repeats the animation continuously. Turn off to play only once."
                      withArrow
                      position="top-start"
                      color={ANIMATION_TOOLTIP_COLOR}
                    >
                      <Checkbox
                        checked={animationClip.loop}
                        label="Loop"
                        onChange={(event) =>
                          onAnimationClipChange({
                            loop: event.currentTarget.checked,
                          })
                        }
                      />
                    </Tooltip>
                    <Tooltip
                      label="Reverses direction on each loop iteration (ping-pong motion)."
                      withArrow
                      position="top-start"
                      color={ANIMATION_TOOLTIP_COLOR}
                    >
                      <Checkbox
                        checked={animationClip.alternate}
                        label="Alternate"
                        onChange={(event) =>
                          onAnimationClipChange({
                            alternate: event.currentTarget.checked,
                          })
                        }
                      />
                    </Tooltip>
                  </Group>

                  <Divider />
                  {isPathsBrokenApart ? (
                    <Group grow>
                      <Button
                        variant="default"
                        leftSection={<IconRotate2 size={16} />}
                        disabled={isAnimationDefault}
                        onClick={onResetAnimationPart}
                      >
                        Reset part
                      </Button>
                      <Button
                        variant="default"
                        leftSection={<IconRotate2 size={16} />}
                        onClick={onResetAnimationAll}
                      >
                        Reset all
                      </Button>
                    </Group>
                  ) : (
                    <Button
                      variant="default"
                      fullWidth
                      leftSection={<IconRotate2 size={16} />}
                      disabled={isAnimationDefault}
                      onClick={() =>
                        onAnimationClipChange({
                          ...defaultAnimationClip,
                        })
                      }
                    >
                      Reset animation
                    </Button>
                  )}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
      </ScrollArea>
    </Stack>
  );
}
